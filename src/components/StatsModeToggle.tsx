import { Link } from "react-router-dom";
import {
  buildStatsHref,
  getStatsModeLabel,
  type StatsMode,
} from "../lib/statsMode";

interface StatsModeToggleProps {
  basePath: string;
  mode: StatsMode;
  previewMock?: boolean;
  className?: string;
}

const MODES: StatsMode[] = ["vanilla", "spm"];

export function StatsModeToggle({
  basePath,
  mode,
  previewMock = false,
  className = "",
}: StatsModeToggleProps) {
  return (
    <div
      className={`grid grid-cols-2 border-2 border-black dark:border-gray-700 ${className}`}
    >
      {MODES.map((entry) => {
        const active = entry === mode;
        return (
          <Link
            key={entry}
            to={buildStatsHref(basePath, entry, previewMock)}
            className={`min-w-0 px-3 py-3 sm:py-4 text-center text-[11px] sm:text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              active
                ? "bg-[#e10600] text-white"
                : "bg-white text-black hover:bg-gray-50 dark:bg-[#1a1a1a] dark:text-gray-200 dark:hover:bg-[#141414]"
            }`}
          >
            {getStatsModeLabel(entry)}
          </Link>
        );
      })}
    </div>
  );
}
