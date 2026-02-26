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
const SERVER_ID = 1;

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));

// MySQL connection pool
const pool = mysql.createPool(process.env.DATABASE_URL);

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
    const cached = getCached("leaderboard");
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
        [SERVER_ID],
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
        [SERVER_ID],
      ),
      pool.query("SELECT COUNT(*) AS total FROM DBLog_Players"),
    ]);

    const result = {
      topKills: topKills[0],
      topMedics: topMedics[0],
      uniquePlayers: playersRow[0].total,
    };

    setCache("leaderboard", result, CACHE_TTL_LEADERBOARD);
    res.json(result);
  } catch (err) {
    console.error("Leaderboard query failed:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard data" });
  }
});

app.get("/api/live", async (req, res) => {
  try {
    const cached = getCached("live");
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
        [SERVER_ID],
      ),
      pool.query(
        `SELECT layerClassname, startTime, endTime, winner
         FROM DBLog_Matches
         WHERE server = ?
           AND endTime IS NOT NULL
           AND layerClassname NOT LIKE '%Seed%'
         ORDER BY endTime DESC
         LIMIT 10`,
        [SERVER_ID],
      ),
    ]);

    const result = {
      currentMatch: currentRows[0] || null,
      recentMatches: recentRows,
    };

    setCache("live", result, CACHE_TTL_LIVE);
    res.json(result);
  } catch (err) {
    console.error("Live query failed:", err);
    res.status(500).json({ error: "Failed to fetch live data" });
  }
});

app.get("/api/players/search", searchLimiter, async (req, res) => {
  try {
    const q = req.query.q;
    if (!q || typeof q !== "string" || q.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Query must be at least 3 characters" });
    }

    const cacheKey = `search:${q.trim().toLowerCase()}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);

    const [rows] = await pool.query(
      `SELECT steamID, lastName FROM DBLog_Players WHERE lastName LIKE ? LIMIT 10`,
      [`%${q.trim()}%`],
    );

    setCache(cacheKey, rows, CACHE_TTL_LIVE); // 1 min cache
    res.json(rows);
  } catch (err) {
    console.error("Player search failed:", err);
    res.status(500).json({ error: "Failed to search players" });
  }
});

app.get("/api/player/:steamId", async (req, res) => {
  try {
    const { steamId } = req.params;
    if (!/^\d{17}$/.test(steamId)) {
      return res.status(400).json({ error: "Invalid Steam ID" });
    }
    const cacheKey = `player:${steamId}`;
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
        [steamId, SERVER_ID],
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
        [steamId, SERVER_ID],
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
        [steamId, SERVER_ID],
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
        [steamId, SERVER_ID],
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
        [steamId, SERVER_ID],
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
        [steamId, SERVER_ID],
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
        [steamId, SERVER_ID, steamId, SERVER_ID],
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
        [steamId, steamId, SERVER_ID],
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
        [steamId, SERVER_ID],
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
        [steamId, SERVER_ID],
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
        [steamId, SERVER_ID],
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
        [steamId, SERVER_ID],
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
    res.status(500).json({ error: "Failed to fetch player stats" });
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

process.on("SIGTERM", async () => {
  await pool.end();
  process.exit(0);
});
