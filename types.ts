
export interface PlayerInfo {
  steamID: string;
  lastName: string;
  level: number;
  playerTotalScore: number;
  avatar: string;
  discordID: string;
  lastSeenServer?: { id: number; name: string };
  lastSeenTime?: string;
  maxScoreForLevel: number;
  minScoreForLevel: number;
}

export interface SeasonStats {
  seasonWounds: number;
  seasonWoundsRank: number;
  seasonKills: number;
  seasonKillsRank: number;
  seasonDeaths: number;
  seasonDeathsRank: number;
  seasonKdRatio: number;
  seasonKdRatioRank: number;
  seasonRevives: number;
  seasonRevivesRank: number;
  seasonTimesRevived: number;
  seasonTimesRevivedRank: number;
  seasonTks: number;
  seasonTksRank: number;
  seasonTkd: number;
  seasonTkdRank: number;
  seasonHighestKillstreak: number;
  seasonHighestKillstreakRank: number;
  seasonScore: number;
  seasonScoreRank: number;
  seasonFavoriteWeapon?: string;
  seasonFavoriteWeaponCount?: number;
  seasonTopVictimName?: string;
  seasonTopVictimCount?: number;
  seasonTopNemesisName?: string;
  seasonTopNemesisCount?: number;
  seasonTopRevivedName?: string;
  seasonTopRevivedCount?: number;
  seasonTopReviverName?: string;
  seasonTopReviverCount?: number;
}

export interface AllTimeStats {
  totalWounds: number;
  totalWoundsRank: number;
  totalKills: number;
  totalKillsRank: number;
  totalDeaths: number;
  totalDeathsRank: number;
  totalKdRatio: number;
  totalKdRatioRank: number;
  totalRevives: number;
  totalRevivesRank: number;
  totalTimesRevived: number;
  totalTimesRevivedRank: number;
  totalTks: number;
  totalTksRank: number;
  totalTkd: number;
  totalTkdRank: number;
  highestKillstreak: number;
  highestKillstreakRank: number;
  totalScore: number;
  totalScoreRank: number;
}

export interface PlayerStats {
  steamId: string;
  name: string;
  lastName?: string;
  seasonScore?: number;
  totalScore?: number;
  kills: number;
  deaths: number;
  kd: number;
  revives: number;
  rank?: number;
  wounds?: number;
  tks?: number;
  tkd?: number;
  highestKillstreak?: number;
}

export interface WeaponStat {
  weaponName: string;
  kills?: number;
  wounds?: number;
  woundsCount?: number;
  headshots?: number;
  accuracy?: number;
  damageDealt?: number;
}

export interface RibbonStat {
  ribbonId?: number;
  id?: number;
  ribbonName: string;
  ribbonDescription: string;
  ribbonImage?: string;
  timesAwarded: number;
}

export interface DetailedPlayerProfile {
  info: PlayerInfo;
  seasonStats: SeasonStats | null;
  allTimeStats: AllTimeStats | null;
  weapons: WeaponStat[];
  ribbons: RibbonStat[];
}

export interface LeaderboardResponse {
  data: PlayerStats[];
  total: number;
  page: number;
  pageSize: number;
}

export enum LeaderboardType {
  SEASON = 'SEASON',
  ALL_TIME = 'ALL_TIME'
}
