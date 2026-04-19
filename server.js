import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { resolveWeaponName } from "./weapon-map.js";

const app = express();
const PORT = process.env.PORT || 7000;

function parseServerId(value, fallback) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isInteger(parsed) ? parsed : fallback;
}

function parseMode(value) {
  return value === "spm" ? "spm" : "vanilla";
}

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

const databaseSources = {
  vanilla: {
    mode: "vanilla",
    pool: mysql.createPool(process.env.DATABASE_URL),
    serverId: parseServerId(process.env.SERVER_ID, 1),
  },
  spm: process.env.SU_DATABASE_URL
    ? {
        mode: "spm",
        pool: mysql.createPool(process.env.SU_DATABASE_URL),
        serverId: parseServerId(process.env.SU_SERVER_ID, 1),
      }
    : null,
};

// Simple in-memory cache with per-key TTL
const CACHE_TTL_LEADERBOARD = 60 * 60 * 1000; // 60 minutes
const CACHE_TTL_LIVE = 60 * 1000; // 1 minute
const cache = {};

function getCached(key) {
  const entry = cache[key];
  if (entry && Date.now() - entry.timestamp < entry.ttl) {
    return entry.data;
  }
  return null;
}

function setCache(key, data, ttl) {
  cache[key] = { data, timestamp: Date.now(), ttl };
}

function getDataSource(req) {
  const mode = parseMode(req.query.mode);
  const source = databaseSources[mode];

  if (!source) {
    const error = new Error(
      "Supermod database is not configured. Set SU_DATABASE_URL to enable mode=spm.",
    );
    error.statusCode = 503;
    throw error;
  }

  return source;
}

const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests" },
});

// API routes (must come before SPA catch-all)
app.get("/api/leaderboard", async (req, res) => {
  try {
    const source = getDataSource(req);
    const { mode, pool, serverId } = source;
    const cached = getCached(`${mode}:leaderboard`);
    if (cached) {
      return res.json(cached);
    }

    const [topKills, topMedics, [playersRow]] = await Promise.all([
      pool.query(
        `SELECT d.attacker AS steamID, MAX(d.attackerName) AS name, COUNT(*) AS kills
         FROM DBLog_Deaths d
         JOIN DBLog_Matches m ON m.id = d.match
         WHERE d.server = ?
           AND d.teamkill = 0
           AND m.layerClassname NOT LIKE '%Seed%'
           AND d.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND d.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
         GROUP BY d.attacker
         ORDER BY kills DESC
         LIMIT 15`,
        [serverId],
      ),
      pool.query(
        `SELECT r.reviver AS steamID, MAX(r.reviverName) AS name, COUNT(*) AS revives
         FROM DBLog_Revives r
         JOIN DBLog_Matches m ON m.id = r.match
         WHERE r.server = ?
           AND m.layerClassname NOT LIKE '%Seed%'
           AND r.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND r.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
         GROUP BY r.reviver
         ORDER BY revives DESC
         LIMIT 15`,
        [serverId],
      ),
      pool.query("SELECT COUNT(*) AS total FROM DBLog_Players"),
    ]);

    const result = {
      topKills: topKills[0],
      topMedics: topMedics[0],
      uniquePlayers: playersRow[0].total,
    };

    setCache(`${mode}:leaderboard`, result, CACHE_TTL_LEADERBOARD);
    res.json(result);
  } catch (err) {
    console.error("Leaderboard query failed:", err);
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Failed to fetch leaderboard data" });
  }
});

app.get("/api/live", async (req, res) => {
  try {
    const source = getDataSource(req);
    const { mode, pool, serverId } = source;
    const cached = getCached(`${mode}:live`);
    if (cached) {
      return res.json(cached);
    }

    const [[currentRows], [recentRows]] = await Promise.all([
      pool.query(
        `SELECT layer, map, mapClassname, layerClassname, dlc, startTime
         FROM DBLog_Matches
         WHERE server = ? AND endTime IS NULL
         ORDER BY startTime DESC
         LIMIT 1`,
        [serverId],
      ),
      pool.query(
        `SELECT layerClassname, startTime, endTime, winner
         FROM DBLog_Matches
         WHERE server = ?
           AND endTime IS NOT NULL
           AND layerClassname NOT LIKE '%Seed%'
         ORDER BY endTime DESC
         LIMIT 10`,
        [serverId],
      ),
    ]);

    const result = {
      currentMatch: currentRows[0] || null,
      recentMatches: recentRows,
    };

    setCache(`${mode}:live`, result, CACHE_TTL_LIVE);
    res.json(result);
  } catch (err) {
    console.error("Live query failed:", err);
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Failed to fetch live data" });
  }
});

app.get("/api/players/search", searchLimiter, async (req, res) => {
  try {
    const source = getDataSource(req);
    const { mode, pool } = source;
    const q = req.query.q;
    if (!q || typeof q !== "string" || q.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Query must be at least 3 characters" });
    }

    const cacheKey = `${mode}:search:${q.trim().toLowerCase()}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);

    const sanitized = q.trim().replace(/[%_]/g, "\\$&");
    const [rows] = await pool.query(
      `SELECT steamID, lastName FROM DBLog_Players WHERE lastName LIKE ? LIMIT 10`,
      [`%${sanitized}%`],
    );

    setCache(cacheKey, rows, CACHE_TTL_LIVE); // 1 min cache
    res.json(rows);
  } catch (err) {
    console.error("Player search failed:", err);
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Failed to search players" });
  }
});

app.get("/api/player/:steamId", async (req, res) => {
  try {
    const source = getDataSource(req);
    const { mode, pool, serverId } = source;
    const { steamId } = req.params;
    if (!/^\d{17}$/.test(steamId)) {
      return res.status(400).json({ error: "Invalid Steam ID" });
    }
    const cacheKey = `${mode}:player:${steamId}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);

    const [
      [playerRows],
      [killRows],
      [reviveRows],
      [deathRows],
      [teamkillRows],
      [topWeaponRows],
      [damageRows],
      [matchRows],
      [topMapRows],
      [topVictimRows],
      [mostRevivedRows],
      [mostRevivedByRows],
      [nemesisRows],
    ] = await Promise.all([
      pool.query(
        `SELECT steamID, lastName FROM DBLog_Players WHERE steamID = ? LIMIT 1`,
        [steamId],
      ),
      pool.query(
        `SELECT COUNT(*) AS kills
         FROM DBLog_Deaths d
         JOIN DBLog_Matches m ON m.id = d.match
         WHERE d.attacker = ?
           AND d.server = ?
           AND d.teamkill = 0
           AND m.layerClassname NOT LIKE '%Seed%'
           AND d.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND d.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)`,
        [steamId, serverId],
      ),
      pool.query(
        `SELECT COUNT(*) AS revives
         FROM DBLog_Revives r
         JOIN DBLog_Matches m ON m.id = r.match
         WHERE r.reviver = ?
           AND r.server = ?
           AND m.layerClassname NOT LIKE '%Seed%'
           AND r.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND r.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)`,
        [steamId, serverId],
      ),
      // Deaths (non-teamkill)
      pool.query(
        `SELECT COUNT(*) AS deaths
         FROM DBLog_Deaths d
         JOIN DBLog_Matches m ON m.id = d.match
         WHERE d.victim = ?
           AND d.server = ?
           AND d.teamkill = 0
           AND m.layerClassname NOT LIKE '%Seed%'
           AND d.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND d.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)`,
        [steamId, serverId],
      ),
      // Teamkills
      pool.query(
        `SELECT COUNT(*) AS teamkills
         FROM DBLog_Deaths d
         JOIN DBLog_Matches m ON m.id = d.match
         WHERE d.attacker = ?
           AND d.server = ?
           AND d.teamkill = 1
           AND m.layerClassname NOT LIKE '%Seed%'
           AND d.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND d.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)`,
        [steamId, serverId],
      ),
      // Top weapons by damage
      pool.query(
        `SELECT w.weapon, COALESCE(SUM(w.damage), 0) AS damage
         FROM DBLog_Wounds w
         JOIN DBLog_Matches m ON m.id = w.match
         WHERE w.attacker = ?
           AND w.server = ?
           AND w.teamkill = 0
           AND m.layerClassname NOT LIKE '%Seed%'
           AND w.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND w.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
         GROUP BY w.weapon
         ORDER BY damage DESC
         LIMIT 5`,
        [steamId, serverId],
      ),
      // Damage dealt
      pool.query(
        `SELECT COALESCE(SUM(w.damage), 0) AS damage
         FROM DBLog_Wounds w
         JOIN DBLog_Matches m ON m.id = w.match
         WHERE w.attacker = ?
           AND w.server = ?
           AND w.teamkill = 0
           AND m.layerClassname NOT LIKE '%Seed%'
           AND w.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND w.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)`,
        [steamId, serverId],
      ),
      // Matches played (union of attacker + victim to catch all matches)
      pool.query(
        `SELECT COUNT(DISTINCT matchId) AS matchesPlayed FROM (
           SELECT d.match AS matchId
           FROM DBLog_Deaths d
           JOIN DBLog_Matches m ON m.id = d.match
           WHERE d.attacker = ?
             AND d.server = ?
             AND m.layerClassname NOT LIKE '%Seed%'
             AND d.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
             AND d.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
           UNION
           SELECT d2.match AS matchId
           FROM DBLog_Deaths d2
           JOIN DBLog_Matches m2 ON m2.id = d2.match
           WHERE d2.victim = ?
             AND d2.server = ?
             AND m2.layerClassname NOT LIKE '%Seed%'
             AND d2.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
             AND d2.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
         ) AS allMatches`,
        [steamId, serverId, steamId, serverId],
      ),
      // Most played maps
      pool.query(
        `SELECT m.layerClassname, COUNT(*) AS count FROM (
           SELECT DISTINCT d.match
           FROM DBLog_Deaths d
           JOIN DBLog_Matches dm ON dm.id = d.match
           WHERE (d.attacker = ? OR d.victim = ?)
             AND d.server = ?
             AND dm.layerClassname NOT LIKE '%Seed%'
             AND d.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
             AND d.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
         ) AS pm
         JOIN DBLog_Matches m ON m.id = pm.match
         GROUP BY m.layerClassname
         ORDER BY count DESC
         LIMIT 5`,
        [steamId, steamId, serverId],
      ),
      // Top victim (player killed the most by this player)
      pool.query(
        `SELECT MAX(d.victimName) AS name, d.victim AS steamID, COUNT(*) AS kills
         FROM DBLog_Deaths d
         JOIN DBLog_Matches m ON m.id = d.match
         WHERE d.attacker = ?
           AND d.server = ?
           AND d.teamkill = 0
           AND m.layerClassname NOT LIKE '%Seed%'
           AND d.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND d.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
         GROUP BY d.victim
         ORDER BY kills DESC
         LIMIT 1`,
        [steamId, serverId],
      ),
      // Most revived (player this person revived the most)
      pool.query(
        `SELECT MAX(r.victimName) AS name, r.victim AS steamID, COUNT(*) AS revives
         FROM DBLog_Revives r
         JOIN DBLog_Matches m ON m.id = r.match
         WHERE r.reviver = ?
           AND r.server = ?
           AND m.layerClassname NOT LIKE '%Seed%'
           AND r.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND r.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
         GROUP BY r.victim
         ORDER BY revives DESC
         LIMIT 1`,
        [steamId, serverId],
      ),
      // Most revived by (player who revived this person the most)
      pool.query(
        `SELECT MAX(r.reviverName) AS name, r.reviver AS steamID, COUNT(*) AS revives
         FROM DBLog_Revives r
         JOIN DBLog_Matches m ON m.id = r.match
         WHERE r.victim = ?
           AND r.server = ?
           AND m.layerClassname NOT LIKE '%Seed%'
           AND r.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND r.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
         GROUP BY r.reviver
         ORDER BY revives DESC
         LIMIT 1`,
        [steamId, serverId],
      ),
      // Nemesis (player who killed this person the most)
      pool.query(
        `SELECT MAX(d.attackerName) AS name, d.attacker AS steamID, COUNT(*) AS kills
         FROM DBLog_Deaths d
         JOIN DBLog_Matches m ON m.id = d.match
         WHERE d.victim = ?
           AND d.server = ?
           AND d.teamkill = 0
           AND m.layerClassname NOT LIKE '%Seed%'
           AND d.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
           AND d.time <= DATE_SUB(NOW(), INTERVAL 2 HOUR)
         GROUP BY d.attacker
         ORDER BY kills DESC
         LIMIT 1`,
        [steamId, serverId],
      ),
    ]);

    if (!playerRows.length) {
      return res.status(404).json({ error: "Player not found" });
    }

    const result = {
      steamID: playerRows[0].steamID,
      name: playerRows[0].lastName,
      kills: killRows[0].kills,
      deaths: deathRows[0].deaths,
      revives: reviveRows[0].revives,
      teamkills: teamkillRows[0].teamkills,
      topWeapons: topWeaponRows.map((w) => ({
        weapon: resolveWeaponName(w.weapon),
        damage: parseFloat(w.damage) || 0,
      })),
      damage: parseFloat(damageRows[0].damage) || 0,
      matchesPlayed: matchRows[0].matchesPlayed,
      topMaps: topMapRows,
      topVictim: topVictimRows[0] || null,
      mostRevived: mostRevivedRows[0] || null,
      mostRevivedBy: mostRevivedByRows[0] || null,
      nemesis: nemesisRows[0] || null,
    };

    setCache(cacheKey, result, CACHE_TTL_LEADERBOARD); // 60 min cache
    res.json(result);
  } catch (err) {
    console.error("Player stats failed:", err);
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Failed to fetch player stats" });
  }
});

// Static files & SPA catch-all
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

async function closePoolsAndExit() {
  const pools = Object.values(databaseSources)
    .filter(Boolean)
    .map((source) => source.pool);
  await Promise.all(pools.map((pool) => pool.end()));
  process.exit(0);
}

process.on("SIGTERM", closePoolsAndExit);
process.on("SIGINT", closePoolsAndExit);
