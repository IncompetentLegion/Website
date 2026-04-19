export type StatsMode = "vanilla" | "spm";

export const DEFAULT_STATS_MODE: StatsMode = "vanilla";

export function parseStatsMode(value: string | null | undefined): StatsMode {
  return value === "spm" ? "spm" : DEFAULT_STATS_MODE;
}

export function getStatsModeLabel(mode: StatsMode) {
  return mode === "spm" ? "SPM" : "Vanilla";
}

export function buildStatsQuery(mode: StatsMode, previewMock = false) {
  const params = new URLSearchParams({ mode });
  if (previewMock) {
    params.set("preview", "mock");
  }
  return `?${params.toString()}`;
}

export function buildStatsHref(
  path: string,
  mode: StatsMode,
  previewMock = false,
) {
  return `${path}${buildStatsQuery(mode, previewMock)}`;
}

export function usesMockStats(
  _mode: StatsMode,
  previewParam: string | null | undefined,
) {
  return previewParam === "mock";
}
