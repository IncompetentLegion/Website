import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import cors from "cors";

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
const CACHE_TTL_LEADERBOARD = 30 * 60 * 1000; // 30 minutes
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

// API routes (must come before SPA catch-all)
app.get("/api/leaderboard", async (req, res) => {
  try {
    const cached = getCached("leaderboard");
    if (cached) {
      return res.json(cached);
    }

    const [topKills, topMedics, [playersRow]] = await Promise.all([
      pool.query(
        `SELECT MAX(d.attackerName) AS name, COUNT(*) AS kills
         FROM DBLog_Deaths d
         JOIN DBLog_Matches m ON m.id = d.match
         WHERE d.server = ?
           AND d.teamkill = 0
           AND m.layerClassname NOT LIKE '%Seed%'
           AND d.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
         GROUP BY d.attacker
         ORDER BY kills DESC
         LIMIT 15`,
        [SERVER_ID]
      ),
      pool.query(
        `SELECT MAX(r.reviverName) AS name, COUNT(*) AS revives
         FROM DBLog_Revives r
         JOIN DBLog_Matches m ON m.id = r.match
         WHERE r.server = ?
           AND m.layerClassname NOT LIKE '%Seed%'
           AND r.time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
         GROUP BY r.reviver
         ORDER BY revives DESC
         LIMIT 15`,
        [SERVER_ID]
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
        [SERVER_ID]
      ),
      pool.query(
        `SELECT layerClassname, startTime, endTime, winner
         FROM DBLog_Matches
         WHERE server = ?
           AND endTime IS NOT NULL
           AND layerClassname NOT LIKE '%Seed%'
         ORDER BY endTime DESC
         LIMIT 10`,
        [SERVER_ID]
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
