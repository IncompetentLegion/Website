import { Link, useSearchParams } from 'react-router-dom';
import { SectionHeader, Card, Badge, StatBox, ErrorBox, SkeletonBlock } from '../components/UI';
import { PlayerSearch } from '../components/PlayerSearch';
import { StatsModeToggle } from '../components/StatsModeToggle';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useLive } from '../hooks/useLive';
import {
  buildStatsHref,
  getStatsModeLabel,
  parseStatsMode,
  usesMockStats,
} from '../lib/statsMode';

function getStatsSubtitle(modeLabel: string, useMockData: boolean) {
  if (useMockData) {
    return `${modeLabel} preview data for UI review before touching live services.`;
  }
  return `Live ${modeLabel} server statistics from the last 6 months.`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

const LeaderboardPage = () => {
  const [searchParams] = useSearchParams();
  const mode = parseStatsMode(searchParams.get('mode'));
  const explicitMockPreview = searchParams.get('preview') === 'mock';
  const useMockData = usesMockStats(mode, searchParams.get('preview'));
  const modeLabel = getStatsModeLabel(mode);

  const { data: lb, isLoading: lbLoading, error: lbError } = useLeaderboard(mode, useMockData);
  const { data: live, isLoading: liveLoading, error: liveError } = useLive(mode, useMockData);
  const leaderboardError = lbError instanceof Error ? lbError.message : String(lbError);
  const liveErrorMessage = liveError instanceof Error ? liveError.message : String(liveError);

  const topKiller = lb?.topKills?.[0];
  const topMedic = lb?.topMedics?.[0];

  return (
    <div className="bg-white dark:bg-[#0f0f0f] min-h-screen pb-32">
      <div className="container mx-auto px-4 md:px-8 pt-40">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16">
          <SectionHeader
            title={`${modeLabel} Stats`}
            subtitle={getStatsSubtitle(modeLabel, useMockData)}
            accent={mode === 'spm' ? 'Supermod Leaderboard' : 'Vanilla Leaderboard'}
            className="mb-0"
            highlightWord="first"
          />
          <div className="shrink-0 md:pt-8">
            <PlayerSearch mode={mode} previewMock={explicitMockPreview} />
          </div>
        </div>

        <section className="mb-8">
          <StatsModeToggle
            basePath="/leaderboard"
            mode={mode}
            previewMock={explicitMockPreview}
            className="max-w-xl"
          />
        </section>

        {useMockData && (
          <section className="mb-10">
            <div className="bg-gray-50 dark:bg-[#141414] p-6 border-l-4 border-black dark:border-gray-500">
              <div className="flex flex-wrap items-center gap-3">
                <Badge color={mode === 'spm' ? 'red' : 'black'}>{modeLabel}</Badge>
                <Badge color="black">Preview Data</Badge>
              </div>
              <p className="mt-4 text-xs font-bold text-gray-500 leading-relaxed uppercase tracking-widest">
                {mode === 'spm'
                  ? 'SPM is currently rendered from frontend mock data so you can review the interface without hitting the live Supermod database.'
                  : 'Preview mode is forcing mock data for Vanilla so you can review the layout without relying on the live database.'}
              </p>
            </div>
          </section>
        )}

        {/* Stats Row */}
        <section className="mb-16">
          {lbLoading || liveLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-gray-50 dark:bg-[#1a1a1a] animate-pulse border-l-4 border-gray-200 dark:border-gray-700" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatBox
                label="Unique Players"
                value={lb?.uniquePlayers?.toLocaleString() ?? '—'}
              />
              <StatBox
                label="Top Killer"
                value={topKiller?.name ?? '—'}
                suffix={topKiller ? ` (${topKiller.kills.toLocaleString()})` : ''}
                href={topKiller ? buildStatsHref(`/player/${topKiller.steamID}`, mode, explicitMockPreview) : undefined}
              />
              <StatBox
                label="Top Medic"
                value={topMedic?.name ?? '—'}
                suffix={topMedic ? ` (${topMedic.revives.toLocaleString()})` : ''}
                href={topMedic ? buildStatsHref(`/player/${topMedic.steamID}`, mode, explicitMockPreview) : undefined}
              />
            </div>
          )}
        </section>

        {/* Current Match */}
        <section className="mb-16">
          {liveError && <ErrorBox message={liveErrorMessage} />}
          {liveLoading && <SkeletonBlock rows={2} cols={4} />}
          {live?.currentMatch && (
            <Card title="Current Match">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge color={mode === 'spm' ? 'red' : 'black'}>{modeLabel}</Badge>
                    <Badge color="red">Live</Badge>
                    {live.currentMatch.dlc && (
                      <Badge color="black">{live.currentMatch.dlc}</Badge>
                    )}
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Started {formatDate(live.currentMatch.startTime)}
                    </span>
                  </div>
                  <p className="text-2xl font-black tracking-tight">
                    {live.currentMatch.layer}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{live.currentMatch.map}</span>
                    {live.currentMatch.layerClassname && (
                      <span className="text-xs text-gray-300 dark:text-gray-600 font-mono">{live.currentMatch.layerClassname}</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Duration</span>
                  <span className="text-xl font-black tabular-nums">
                    {(() => {
                      const mins = Math.floor((Date.now() - new Date(live.currentMatch.startTime).getTime()) / 60000);
                      const h = Math.floor(mins / 60);
                      const m = mins % 60;
                      return h > 0 ? `${h}h ${m}m` : `${m}m`;
                    })()}
                  </span>
                </div>
              </div>
            </Card>
          )}
          {live && !live.currentMatch && (
            <Card title="Current Match">
              <div className="flex items-center gap-4">
                <Badge color="gray">Offline</Badge>
                <span className="text-sm text-gray-400">No active match</span>
              </div>
            </Card>
          )}
        </section>

        {/* Leaderboards — two-column grid */}
        <section className="mb-16">
          {lbError && <ErrorBox message={leaderboardError} />}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Most Kills */}
            <Card title="Most Kills">
              {lbLoading && <SkeletonBlock rows={10} cols={2} />}
              {lb?.topKills && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[320px]">
                    <thead>
                      <tr className="border-b-2 border-black dark:border-gray-600">
                        <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3 pr-4">#</th>
                        <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Player</th>
                        <th className="text-right text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Kills</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lb.topKills.map((entry, i) => (
                        <tr key={entry.steamID} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                          <td className="py-3 pr-4 text-sm font-black text-gray-300 w-8">
                            {i + 1}
                          </td>
                          <td className="py-3 text-sm font-bold tracking-tight">
                            <Link to={buildStatsHref(`/player/${entry.steamID}`, mode, explicitMockPreview)} className="hover:text-[#e10600] transition-colors">
                              {entry.name}
                            </Link>
                          </td>
                          <td className="py-3 text-right text-sm font-black tabular-nums">
                            {entry.kills.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* Top Medics */}
            <Card title="Top Medic">
              {lbLoading && <SkeletonBlock rows={10} cols={2} />}
              {lb?.topMedics && (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[320px]">
                    <thead>
                      <tr className="border-b-2 border-black dark:border-gray-600">
                        <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3 pr-4">#</th>
                        <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Player</th>
                        <th className="text-right text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Revives</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lb.topMedics.map((entry, i) => (
                        <tr key={entry.steamID} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                          <td className="py-3 pr-4 text-sm font-black text-gray-300 w-8">
                            {i + 1}
                          </td>
                          <td className="py-3 text-sm font-bold tracking-tight">
                            <Link to={buildStatsHref(`/player/${entry.steamID}`, mode, explicitMockPreview)} className="hover:text-[#e10600] transition-colors">
                              {entry.name}
                            </Link>
                          </td>
                          <td className="py-3 text-right text-sm font-black tabular-nums">
                            {entry.revives.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        </section>

        {/* Recent Match History */}
        <section className="mb-16">
          <Card title="Recent Matches">
            {liveError && <ErrorBox message={liveErrorMessage} />}
            {liveLoading && <SkeletonBlock rows={6} cols={5} />}
            {live?.recentMatches && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-black dark:border-gray-600">
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Layer</th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Start</th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">End</th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {live.recentMatches.map((m, i) => (
                      <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                        <td className="py-3 text-sm font-bold tracking-tight pr-4">{m.layerClassname}</td>
                        <td className="py-3 text-xs text-gray-400 pr-4 whitespace-nowrap">{formatDate(m.startTime)}</td>
                        <td className="py-3 text-xs text-gray-400 pr-4 whitespace-nowrap">{m.endTime ? formatDate(m.endTime) : '—'}</td>
                        <td className="py-3 text-sm font-bold">{m.winner || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
};

export default LeaderboardPage;
