import { useParams, Link, useSearchParams } from 'react-router-dom';
import { SectionHeader, StatBox, Card, ErrorBox, SkeletonBlock, Badge } from '../components/UI';
import { PlayerSearch } from '../components/PlayerSearch';
import { StatsModeToggle } from '../components/StatsModeToggle';
import { usePlayerStats } from '../hooks/usePlayerStats';
import {
  buildStatsHref,
  getStatsModeLabel,
  parseStatsMode,
  usesMockStats,
} from '../lib/statsMode';

function getPlayerSubtitle(modeLabel: string, useMockData: boolean) {
  if (useMockData) {
    return `${modeLabel} player profile preview`;
  }
  return `Live ${modeLabel} player profile`;
}

const PlayerPage = () => {
  const { steamId } = useParams<{ steamId: string }>();
  const [searchParams] = useSearchParams();
  const mode = parseStatsMode(searchParams.get('mode'));
  const explicitMockPreview = searchParams.get('preview') === 'mock';
  const useMockData = usesMockStats(mode, searchParams.get('preview'));
  const modeLabel = getStatsModeLabel(mode);
  const { data: player, isLoading, error } = usePlayerStats(steamId ?? '', mode, useMockData);
  const playerError = error instanceof Error ? error.message : String(error);

  const kd = player
    ? player.deaths > 0
      ? (player.kills / player.deaths).toFixed(2)
      : '—'
    : '—';

  const killsPerMatch = player
    ? player.matchesPlayed > 0
      ? (player.kills / player.matchesPlayed).toFixed(1)
      : '—'
    : '—';

  return (
    <div className="bg-white dark:bg-[#0f0f0f] min-h-screen pb-32">
      <div className="container mx-auto px-4 md:px-8 pt-40">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <SectionHeader
            title={isLoading ? 'Loading...' : (player?.name ?? 'Unknown Player')}
            subtitle={getPlayerSubtitle(modeLabel, useMockData)}
            accent={mode === 'spm' ? 'SPM Player Stats' : 'Vanilla Player Stats'}
            titleClassName="text-3xl sm:text-5xl md:text-7xl 3xl:text-8xl 4xl:text-9xl"
            className="mb-0"
          />
          <div className="shrink-0 md:pt-8">
            <PlayerSearch mode={mode} previewMock={explicitMockPreview} />
          </div>
        </div>

        {steamId && (
          <section className="mb-8">
            <StatsModeToggle
              basePath={`/player/${steamId}`}
              mode={mode}
              previewMock={explicitMockPreview}
              className="max-w-xl"
            />
          </section>
        )}

        <div className="mb-8">
          <Link
            to={buildStatsHref('/leaderboard', mode, explicitMockPreview)}
            className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#e10600] transition-colors"
          >
            &larr; Back to Leaderboard
          </Link>
        </div>

        {useMockData && (
          <div className="bg-gray-50 dark:bg-[#141414] p-6 border-l-4 border-black dark:border-gray-500 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge color={mode === 'spm' ? 'red' : 'black'}>{modeLabel}</Badge>
              <Badge color="black">Preview Data</Badge>
            </div>
            <p className="mt-4 text-xs font-bold text-gray-500 leading-relaxed uppercase tracking-widest">
              {mode === 'spm'
                ? 'This player profile is using frontend mock SPM data for preview purposes only.'
                : 'Preview mode is forcing mock Vanilla data on this player page.'}
            </p>
          </div>
        )}

        {error && <ErrorBox message={playerError} />}

        {/* Skeleton loading state */}
        {isLoading && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-50 dark:bg-[#1a1a1a] animate-pulse border-l-4 border-gray-200 dark:border-gray-700" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card title="Top Weapons"><SkeletonBlock rows={5} cols={3} /></Card>
              <Card title="Most Played Maps"><SkeletonBlock rows={5} cols={3} /></Card>
            </div>
          </>
        )}

        {player && (
          <>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Badge color={mode === 'spm' ? 'red' : 'black'}>{modeLabel}</Badge>
              <Badge color="gray">{player.steamID}</Badge>
            </div>

            {/* Stats grid */}
            <section className="mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <StatBox label="Kills" value={player.kills.toLocaleString()} />
                <StatBox label="Deaths" value={player.deaths.toLocaleString()} />
                <StatBox label="K/D Ratio" value={kd} />
                <StatBox label="Revives" value={player.revives.toLocaleString()} />
                <StatBox label="Teamkills" value={player.teamkills.toLocaleString()} />
                <StatBox label="Damage Dealt" value={Math.round(player.damage).toLocaleString()} />
                <StatBox label="Matches Played" value={player.matchesPlayed.toLocaleString()} />
                <StatBox label="Kills / Match" value={killsPerMatch} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mt-4 md:mt-8">
                {player.topVictim && (
                  <StatBox
                    label="Favourite Victim"
                    value={player.topVictim.name}
                    suffix={` (${player.topVictim.kills})`}
                    href={buildStatsHref(`/player/${player.topVictim.steamID}`, mode, explicitMockPreview)}
                  />
                )}
                {player.nemesis && (
                  <StatBox
                    label="Nemesis"
                    value={player.nemesis.name}
                    suffix={` (${player.nemesis.kills})`}
                    href={buildStatsHref(`/player/${player.nemesis.steamID}`, mode, explicitMockPreview)}
                  />
                )}
                {player.mostRevived && (
                  <StatBox
                    label="Most Revived"
                    value={player.mostRevived.name}
                    suffix={` (${player.mostRevived.revives})`}
                    href={buildStatsHref(`/player/${player.mostRevived.steamID}`, mode, explicitMockPreview)}
                  />
                )}
                {player.mostRevivedBy && (
                  <StatBox
                    label="Most Revived By"
                    value={player.mostRevivedBy.name}
                    suffix={` (${player.mostRevivedBy.revives})`}
                    href={buildStatsHref(`/player/${player.mostRevivedBy.steamID}`, mode, explicitMockPreview)}
                  />
                )}
              </div>
            </section>

            {/* Top Weapons & Most Played Maps */}
            <section className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Top Weapons">
                  {player.topWeapons.length === 0 ? (
                    <p className="text-sm text-gray-400">No weapon data</p>
                  ) : (
                    <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-black dark:border-gray-600">
                          <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3 pr-4">#</th>
                          <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Weapon</th>
                          <th className="text-right text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Damage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {player.topWeapons.map((w, i) => (
                          <tr key={w.weapon} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                            <td className="py-3 pr-4 text-sm font-black text-gray-300 w-8">{i + 1}</td>
                            <td className="py-3 text-sm font-bold tracking-tight">{w.weapon}</td>
                            <td className="py-3 text-right text-sm font-black tabular-nums">{Math.round(w.damage).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  )}
                </Card>

                <Card title="Most Played Maps">
                  {player.topMaps.length === 0 ? (
                    <p className="text-sm text-gray-400">No map data</p>
                  ) : (
                    <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-black dark:border-gray-600">
                          <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3 pr-4">#</th>
                          <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Layer</th>
                          <th className="text-right text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Times Played</th>
                        </tr>
                      </thead>
                      <tbody>
                        {player.topMaps.map((m, i) => (
                          <tr key={m.layerClassname} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                            <td className="py-3 pr-4 text-sm font-black text-gray-300 w-8">{i + 1}</td>
                            <td className="py-3 text-sm font-bold tracking-tight">{m.layerClassname}</td>
                            <td className="py-3 text-right text-sm font-black tabular-nums">{m.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  )}
                </Card>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerPage;
