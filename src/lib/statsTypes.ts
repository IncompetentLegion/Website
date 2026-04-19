export interface KillEntry {
  steamID: string;
  name: string;
  kills: number;
}

export interface MedicEntry {
  steamID: string;
  name: string;
  revives: number;
}

export interface LeaderboardData {
  topKills: KillEntry[];
  topMedics: MedicEntry[];
  uniquePlayers: number;
}

export interface MatchInfo {
  layer: string;
  map?: string;
  mapClassname: string;
  layerClassname?: string;
  dlc?: string;
  startTime: string;
  endTime?: string;
  winner?: string;
}

export interface LiveData {
  currentMatch: MatchInfo | null;
  recentMatches: MatchInfo[];
}

export interface PlayerSearchResult {
  steamID: string;
  lastName: string;
}

export interface PlayerStats {
  steamID: string;
  name: string;
  kills: number;
  deaths: number;
  revives: number;
  teamkills: number;
  topWeapons: { weapon: string; damage: number }[];
  damage: number;
  matchesPlayed: number;
  topMaps: { layerClassname: string; count: number }[];
  topVictim: { name: string; steamID: string; kills: number } | null;
  mostRevived: { name: string; steamID: string; revives: number } | null;
  mostRevivedBy: { name: string; steamID: string; revives: number } | null;
  nemesis: { name: string; steamID: string; kills: number } | null;
}
