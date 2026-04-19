import { useQuery } from "@tanstack/react-query";
import { getMockPlayerStats } from "../data/mockStats";
import { fetchJsonOrThrow } from "../lib/api";
import type { StatsMode } from "../lib/statsMode";
import type { PlayerStats } from "../lib/statsTypes";

export type { PlayerStats };

async function fetchPlayerStats(
  steamId: string,
  mode: StatsMode,
): Promise<PlayerStats> {
  return fetchJsonOrThrow<PlayerStats>(
    `/api/player/${encodeURIComponent(steamId)}?mode=${encodeURIComponent(mode)}`,
  );
}

export function usePlayerStats(
  steamId: string,
  mode: StatsMode,
  useMockData = false,
) {
  return useQuery<PlayerStats>({
    queryKey: ["playerStats", mode, steamId, useMockData ? "mock" : "live"],
    queryFn: async () => {
      if (!useMockData) {
        return fetchPlayerStats(steamId, mode);
      }

      const player = getMockPlayerStats(mode, steamId);
      if (!player) {
        throw new Error("Player not found in preview data");
      }
      return player;
    },
    enabled: !!steamId,
    staleTime: 3 * 60 * 1000,
  });
}
