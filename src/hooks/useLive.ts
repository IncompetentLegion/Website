import { useQuery } from "@tanstack/react-query";

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

async function fetchLive(): Promise<LiveData> {
  const res = await fetch("/api/live");
  if (!res.ok) {
    throw new Error(`Live data request failed (${res.status})`);
  }
  return res.json();
}

export function useLive() {
  return useQuery<LiveData>({
    queryKey: ["live"],
    queryFn: fetchLive,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
}
