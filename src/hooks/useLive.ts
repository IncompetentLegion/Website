import { useQuery } from "@tanstack/react-query";
import { getMockLive } from "../data/mockStats";
import { fetchJsonOrThrow } from "../lib/api";
import type { StatsMode } from "../lib/statsMode";
import type { LiveData, MatchInfo } from "../lib/statsTypes";

export type { MatchInfo, LiveData };

async function fetchLive(mode: StatsMode): Promise<LiveData> {
  return fetchJsonOrThrow<LiveData>(`/api/live?mode=${encodeURIComponent(mode)}`);
}

export function useLive(mode: StatsMode, useMockData = false) {
  return useQuery<LiveData>({
    queryKey: ["live", mode, useMockData ? "mock" : "live"],
    queryFn: () =>
      useMockData ? Promise.resolve(getMockLive(mode)) : fetchLive(mode),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
}
