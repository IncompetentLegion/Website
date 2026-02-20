import { useQuery } from "@tanstack/react-query";

export interface KillEntry {
  name: string;
  kills: number;
}

export interface MedicEntry {
  name: string;
  revives: number;
}

export interface LeaderboardData {
  topKills: KillEntry[];
  topMedics: MedicEntry[];
  uniquePlayers: number;
}

async function fetchLeaderboard(): Promise<LeaderboardData> {
  const res = await fetch("/api/leaderboard");
  if (!res.ok) {
    throw new Error(`Leaderboard request failed (${res.status})`);
  }
  return res.json();
}

export function useLeaderboard() {
  return useQuery<LeaderboardData>({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    staleTime: 30 * 60 * 1000, // 30 minutes — matches server cache TTL
  });
}
