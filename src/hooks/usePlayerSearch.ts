import { useQuery } from "@tanstack/react-query";
import { getMockSearchResults } from "../data/mockStats";
import { fetchJsonOrThrow } from "../lib/api";
import type { StatsMode } from "../lib/statsMode";
import type { PlayerSearchResult } from "../lib/statsTypes";

export type { PlayerSearchResult };

async function searchPlayers(
  query: string,
  mode: StatsMode,
): Promise<PlayerSearchResult[]> {
  return fetchJsonOrThrow<PlayerSearchResult[]>(
    `/api/players/search?q=${encodeURIComponent(query)}&mode=${encodeURIComponent(mode)}`,
  );
}

export function usePlayerSearch(
  query: string,
  mode: StatsMode,
  useMockData = false,
) {
  return useQuery<PlayerSearchResult[]>({
    queryKey: ["playerSearch", mode, query, useMockData ? "mock" : "live"],
    queryFn: () =>
      useMockData
        ? Promise.resolve(getMockSearchResults(mode, query))
        : searchPlayers(query, mode),
    enabled: query.length >= 3,
    staleTime: 30 * 1000,
  });
}
