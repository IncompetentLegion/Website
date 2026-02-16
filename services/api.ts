import { LeaderboardType, PlayerStats, LeaderboardResponse, WeaponStat, RibbonStat, PlayerInfo, SeasonStats, AllTimeStats } from '../types';

// Call own backend instead of Supabase directly
async function mssProxy(body: Record<string, unknown>) {
  const res = await fetch('/api/mss', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Proxy request failed');
  }
  return res.json();
}

export const mssApi = {
  async searchPlayers(query: string): Promise<PlayerInfo | null> {
    const json = await mssProxy({ endpoint: 'players', steamid: query });
    const players = json.data || [];
    if (players.length === 0) return null;
    const p = players[0];
    return {
      steamID: p.steamID,
      lastName: p.lastName,
      level: p.level,
      playerTotalScore: p.playerTotalScore,
      avatar: p.avatar,
      discordID: p.discordID,
      lastSeenServer: p.lastSeenServer,
      lastSeenTime: p.lastSeenTime,
      maxScoreForLevel: p.maxScoreForLevel,
      minScoreForLevel: p.minScoreForLevel,
    };
  },

  _currentSeason: null as string | null,

  async detectCurrentSeason(): Promise<string> {
    if (this._currentSeason) return this._currentSeason;
    for (let s = 20; s >= 1; s--) {
      try {
        const json = await mssProxy({
          endpoint: 'seasonLeaderboards',
          search: '',
          pageSize: 1,
          page: 1,
          sortColumn: 'seasonScore',
          sortDirection: 'desc',
          season: `Season ${s}`,
        });
        if (json.status === 'Success' && json.data?.length > 0) {
          this._currentSeason = `Season ${s}`;
          return this._currentSeason;
        }
      } catch {
        continue;
      }
    }
    return 'Season 8';
  },

  async getPlayerSeasonStats(steamId: string, season?: string): Promise<{ stats: SeasonStats | null; seasonName: string }> {
    const seasonName = season || await this.detectCurrentSeason();
    try {
      const json = await mssProxy({
        endpoint: 'seasonLeaderboards',
        search: steamId,
        pageSize: 1,
        page: 1,
        sortColumn: 'seasonScore',
        sortDirection: 'desc',
        season: seasonName,
      });
      const data = json.data || [];
      return { stats: data.length > 0 ? data[0] as SeasonStats : null, seasonName: json.seasonName || seasonName };
    } catch {
      return { stats: null, seasonName };
    }
  },

  async getPlayerAllTimeStats(steamId: string): Promise<AllTimeStats | null> {
    try {
      const json = await mssProxy({
        endpoint: 'allTimeLeaderboards',
        search: steamId,
        pageSize: 1,
        page: 1,
        sortColumn: 'totalScore',
        sortDirection: 'desc',
      });
      const data = json.data || [];
      return data.length > 0 ? data[0] as AllTimeStats : null;
    } catch {
      return null;
    }
  },

  async getPlayerRibbons(steamId: string): Promise<RibbonStat[]> {
    try {
      const json = await mssProxy({
        endpoint: 'playerRibbons',
        steamid: steamId,
      });
      return json.data || [];
    } catch {
      return [];
    }
  },

  async getPlayerWeapons(steamId: string): Promise<WeaponStat[]> {
    try {
      const json = await mssProxy({
        endpoint: 'playerWeapons',
        steamid: steamId,
      });
      return json.data || [];
    } catch {
      return [];
    }
  },

  async getLeaderboard(type: LeaderboardType, page: number = 1, pageSize: number = 10, search: string = ''): Promise<LeaderboardResponse> {
    const body: Record<string, unknown> = {
      endpoint: type === LeaderboardType.SEASON ? 'seasonLeaderboards' : 'allTimeLeaderboards',
      steamid: search,
      search,
      page,
      pageSize,
      sortDirection: 'desc',
      sortColumn: type === LeaderboardType.SEASON ? 'seasonScore' : 'totalScore',
    };

    if (type === LeaderboardType.SEASON) {
      body.season = await this.detectCurrentSeason();
    }

    return mssProxy(body);
  },
};
