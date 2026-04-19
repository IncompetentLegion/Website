import type {
  LeaderboardData,
  LiveData,
  PlayerSearchResult,
  PlayerStats,
} from "../lib/statsTypes";
import type { StatsMode } from "../lib/statsMode";

interface MockDataset {
  leaderboard: LeaderboardData;
  live: LiveData;
  players: PlayerStats[];
}

const vanillaData: MockDataset = {
  leaderboard: {
    uniquePlayers: 842,
    topKills: [
      { steamID: "76561198010000001", name: "Atlas", kills: 724 },
      { steamID: "76561198010000002", name: "Viper", kills: 689 },
      { steamID: "76561198010000003", name: "Mako", kills: 641 },
      { steamID: "76561198010000004", name: "Torque", kills: 612 },
      { steamID: "76561198010000005", name: "Nomad", kills: 590 },
    ],
    topMedics: [
      { steamID: "76561198010000006", name: "Saint", revives: 301 },
      { steamID: "76561198010000007", name: "Rook", revives: 276 },
      { steamID: "76561198010000008", name: "Havoc", revives: 248 },
      { steamID: "76561198010000009", name: "Bishop", revives: 241 },
      { steamID: "76561198010000010", name: "Delta", revives: 220 },
    ],
  },
  live: {
    currentMatch: {
      layer: "Gorodok RAAS v2",
      map: "Gorodok",
      mapClassname: "Gorodok",
      layerClassname: "Gorodok_RAAS_v2",
      dlc: "Vanilla",
      startTime: "2026-04-19T17:45:00.000Z",
    },
    recentMatches: [
      {
        layer: "Yehorivka AAS v1",
        mapClassname: "Yehorivka",
        layerClassname: "Yehorivka_AAS_v1",
        startTime: "2026-04-19T15:55:00.000Z",
        endTime: "2026-04-19T17:21:00.000Z",
        winner: "US Army",
      },
      {
        layer: "Mutaha Invasion v2",
        mapClassname: "Mutaha",
        layerClassname: "Mutaha_Invasion_v2",
        startTime: "2026-04-19T14:12:00.000Z",
        endTime: "2026-04-19T15:42:00.000Z",
        winner: "Irregular Militia",
      },
      {
        layer: "Skorpo TC v1",
        mapClassname: "Skorpo",
        layerClassname: "Skorpo_TC_v1",
        startTime: "2026-04-19T12:38:00.000Z",
        endTime: "2026-04-19T14:01:00.000Z",
        winner: "Canadian Armed Forces",
      },
    ],
  },
  players: [
    {
      steamID: "76561198010000001",
      name: "Atlas",
      kills: 724,
      deaths: 381,
      revives: 118,
      teamkills: 9,
      topWeapons: [
        { weapon: "M4A1", damage: 9321 },
        { weapon: "M240B", damage: 7814 },
        { weapon: "M136", damage: 4300 },
      ],
      damage: 23811,
      matchesPlayed: 118,
      topMaps: [
        { layerClassname: "Gorodok_RAAS_v2", count: 12 },
        { layerClassname: "Yehorivka_AAS_v1", count: 9 },
        { layerClassname: "Mutaha_Invasion_v2", count: 8 },
      ],
      topVictim: { name: "Mako", steamID: "76561198010000003", kills: 22 },
      mostRevived: { name: "Saint", steamID: "76561198010000006", revives: 14 },
      mostRevivedBy: { name: "Rook", steamID: "76561198010000007", revives: 11 },
      nemesis: { name: "Viper", steamID: "76561198010000002", kills: 19 },
    },
    {
      steamID: "76561198010000002",
      name: "Viper",
      kills: 689,
      deaths: 402,
      revives: 75,
      teamkills: 6,
      topWeapons: [
        { weapon: "AK-74M", damage: 8840 },
        { weapon: "PKP", damage: 6901 },
        { weapon: "RPG-7", damage: 4415 },
      ],
      damage: 22008,
      matchesPlayed: 110,
      topMaps: [
        { layerClassname: "Narva_RAAS_v3", count: 11 },
        { layerClassname: "Fallujah_Invasion_v1", count: 9 },
        { layerClassname: "Gorodok_RAAS_v2", count: 8 },
      ],
      topVictim: { name: "Atlas", steamID: "76561198010000001", kills: 19 },
      mostRevived: { name: "Nomad", steamID: "76561198010000005", revives: 10 },
      mostRevivedBy: { name: "Saint", steamID: "76561198010000006", revives: 13 },
      nemesis: { name: "Torque", steamID: "76561198010000004", kills: 17 },
    },
    {
      steamID: "76561198010000006",
      name: "Saint",
      kills: 215,
      deaths: 301,
      revives: 301,
      teamkills: 2,
      topWeapons: [
        { weapon: "M16A4", damage: 4210 },
        { weapon: "M9", damage: 1310 },
        { weapon: "M67 Frag", damage: 960 },
      ],
      damage: 8140,
      matchesPlayed: 124,
      topMaps: [
        { layerClassname: "Yehorivka_AAS_v1", count: 13 },
        { layerClassname: "Skorpo_TC_v1", count: 11 },
        { layerClassname: "GooseBay_RAAS_v2", count: 9 },
      ],
      topVictim: { name: "Rook", steamID: "76561198010000007", kills: 7 },
      mostRevived: { name: "Atlas", steamID: "76561198010000001", revives: 18 },
      mostRevivedBy: { name: "Bishop", steamID: "76561198010000009", revives: 9 },
      nemesis: { name: "Viper", steamID: "76561198010000002", kills: 11 },
    },
  ],
};

const spmData: MockDataset = {
  leaderboard: {
    uniquePlayers: 517,
    topKills: [
      { steamID: "76561198120000001", name: "Sabre", kills: 1198 },
      { steamID: "76561198120000002", name: "Raptor", kills: 1132 },
      { steamID: "76561198120000003", name: "Helix", kills: 1089 },
      { steamID: "76561198120000004", name: "Kodiak", kills: 991 },
      { steamID: "76561198120000005", name: "Warden", kills: 942 },
    ],
    topMedics: [
      { steamID: "76561198120000006", name: "Patch", revives: 488 },
      { steamID: "76561198120000007", name: "Ember", revives: 441 },
      { steamID: "76561198120000008", name: "Monsoon", revives: 405 },
      { steamID: "76561198120000009", name: "Oracle", revives: 397 },
      { steamID: "76561198120000010", name: "Comet", revives: 362 },
    ],
  },
  live: {
    currentMatch: {
      layer: "BlackCoast SPM Warfare",
      map: "Black Coast",
      mapClassname: "BlackCoast",
      layerClassname: "BlackCoast_SPM_Warfare",
      dlc: "SPM",
      startTime: "2026-04-19T18:05:00.000Z",
    },
    recentMatches: [
      {
        layer: "Harju SPM Frontline",
        mapClassname: "Harju",
        layerClassname: "Harju_SPM_Frontline",
        startTime: "2026-04-19T16:14:00.000Z",
        endTime: "2026-04-19T17:58:00.000Z",
        winner: "Task Force Sabre",
      },
      {
        layer: "Sanxian SPM Assault",
        mapClassname: "Sanxian",
        layerClassname: "Sanxian_SPM_Assault",
        startTime: "2026-04-19T14:26:00.000Z",
        endTime: "2026-04-19T16:02:00.000Z",
        winner: "People's Liberation Army",
      },
      {
        layer: "Al Basrah SPM Siege",
        mapClassname: "AlBasrah",
        layerClassname: "AlBasrah_SPM_Siege",
        startTime: "2026-04-19T12:33:00.000Z",
        endTime: "2026-04-19T14:11:00.000Z",
        winner: "British Army",
      },
    ],
  },
  players: [
    {
      steamID: "76561198120000001",
      name: "Sabre",
      kills: 1198,
      deaths: 544,
      revives: 166,
      teamkills: 12,
      topWeapons: [
        { weapon: "HK416 DMR", damage: 16321 },
        { weapon: "M27 IAR", damage: 14004 },
        { weapon: "Carl Gustaf", damage: 6733 },
      ],
      damage: 40122,
      matchesPlayed: 156,
      topMaps: [
        { layerClassname: "BlackCoast_SPM_Warfare", count: 14 },
        { layerClassname: "Harju_SPM_Frontline", count: 12 },
        { layerClassname: "Sanxian_SPM_Assault", count: 10 },
      ],
      topVictim: { name: "Helix", steamID: "76561198120000003", kills: 28 },
      mostRevived: { name: "Patch", steamID: "76561198120000006", revives: 17 },
      mostRevivedBy: { name: "Ember", steamID: "76561198120000007", revives: 21 },
      nemesis: { name: "Raptor", steamID: "76561198120000002", kills: 24 },
    },
    {
      steamID: "76561198120000002",
      name: "Raptor",
      kills: 1132,
      deaths: 571,
      revives: 140,
      teamkills: 8,
      topWeapons: [
        { weapon: "AK-12", damage: 15412 },
        { weapon: "PKM", damage: 12206 },
        { weapon: "Kornet", damage: 7050 },
      ],
      damage: 38668,
      matchesPlayed: 149,
      topMaps: [
        { layerClassname: "Harju_SPM_Frontline", count: 16 },
        { layerClassname: "AlBasrah_SPM_Siege", count: 11 },
        { layerClassname: "BlackCoast_SPM_Warfare", count: 9 },
      ],
      topVictim: { name: "Sabre", steamID: "76561198120000001", kills: 24 },
      mostRevived: { name: "Warden", steamID: "76561198120000005", revives: 12 },
      mostRevivedBy: { name: "Patch", steamID: "76561198120000006", revives: 16 },
      nemesis: { name: "Kodiak", steamID: "76561198120000004", kills: 20 },
    },
    {
      steamID: "76561198120000006",
      name: "Patch",
      kills: 362,
      deaths: 389,
      revives: 488,
      teamkills: 3,
      topWeapons: [
        { weapon: "G36K", damage: 7080 },
        { weapon: "P320", damage: 1804 },
        { weapon: "Frag Grenade", damage: 1240 },
      ],
      damage: 12490,
      matchesPlayed: 171,
      topMaps: [
        { layerClassname: "Sanxian_SPM_Assault", count: 17 },
        { layerClassname: "BlackCoast_SPM_Warfare", count: 15 },
        { layerClassname: "Harju_SPM_Frontline", count: 12 },
      ],
      topVictim: { name: "Ember", steamID: "76561198120000007", kills: 8 },
      mostRevived: { name: "Sabre", steamID: "76561198120000001", revives: 24 },
      mostRevivedBy: { name: "Oracle", steamID: "76561198120000009", revives: 11 },
      nemesis: { name: "Raptor", steamID: "76561198120000002", kills: 15 },
    },
  ],
};

function getDataset(mode: StatsMode) {
  return mode === "spm" ? spmData : vanillaData;
}

export function getMockLeaderboard(mode: StatsMode): LeaderboardData {
  return getDataset(mode).leaderboard;
}

export function getMockLive(mode: StatsMode): LiveData {
  return getDataset(mode).live;
}

export function getMockSearchResults(
  mode: StatsMode,
  query: string,
): PlayerSearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 3) {
    return [];
  }

  return getDataset(mode).players
    .filter((player) => player.name.toLowerCase().includes(normalized))
    .slice(0, 10)
    .map((player) => ({
      steamID: player.steamID,
      lastName: player.name,
    }));
}

export function getMockPlayerStats(
  mode: StatsMode,
  steamId: string,
): PlayerStats | null {
  return (
    getDataset(mode).players.find((player) => player.steamID === steamId) ?? null
  );
}
