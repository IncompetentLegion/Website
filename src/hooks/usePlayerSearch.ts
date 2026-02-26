import { useQuery } from "@tanstack/react-query";

export interface PlayerSearchResult {
  steamID: string;
  lastName: string;
}

async function searchPlayers(query: string): Promise<PlayerSearchResult[]> {
  const res = await fetch(`/api/players/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error(`Search request failed (${res.status})`);
  }
  return res.json();
}

export function usePlayerSearch(query: string) {
  return useQuery<PlayerSearchResult[]>({
    queryKey: ["playerSearch", query],
    queryFn: () => searchPlayers(query),
    enabled: query.length >= 3,
    staleTime: 30 * 1000,
  });
}
