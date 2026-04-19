import { useQuery } from "@tanstack/react-query";
import { getMockLeaderboard } from "../data/mockStats";
import { fetchJsonOrThrow } from "../lib/api";
import type { StatsMode } from "../lib/statsMode";
import type { LeaderboardData } from "../lib/statsTypes";

async function fetchLeaderboard(mode: StatsMode): Promise<LeaderboardData> {
  return fetchJsonOrThrow<LeaderboardData>(
    `/api/leaderboard?mode=${encodeURIComponent(mode)}`,
  );
}

export function useLeaderboard(mode: StatsMode, useMockData = false) {
  return useQuery<LeaderboardData>({
    queryKey: ["leaderboard", mode, useMockData ? "mock" : "live"],
    queryFn: () =>
      useMockData
        ? Promise.resolve(getMockLeaderboard(mode))
        : fetchLeaderboard(mode),
    staleTime: 30 * 60 * 1000, // 30 minutes — matches server cache TTL
  });
}
