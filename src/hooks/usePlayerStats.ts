import { useQuery } from "@tanstack/react-query";

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

async function fetchPlayerStats(steamId: string): Promise<PlayerStats> {
  const res = await fetch(`/api/player/${encodeURIComponent(steamId)}`);
  if (!res.ok) {
    throw new Error(`Player stats request failed (${res.status})`);
  }
  return res.json();
}

export function usePlayerStats(steamId: string) {
  return useQuery<PlayerStats>({
    queryKey: ["playerStats", steamId],
    queryFn: () => fetchPlayerStats(steamId),
    enabled: !!steamId,
    staleTime: 3 * 60 * 1000,
  });
}
