
import { SectionHeader, Card, Badge, StatBox, SkeletonRow } from '../components/UI';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useLive } from '../hooks/useLive';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="border-2 border-[#e10600] bg-red-50 p-6">
      <p className="text-sm font-bold text-[#e10600] uppercase tracking-wider">
        Failed to load data
      </p>
      <p className="text-xs text-gray-500 mt-2">{message}</p>
    </div>
  );
}

function SkeletonBlock({ rows = 5, cols = 3 }: { rows?: number; cols?: number }) {
  return (
    <table className="w-full">
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonRow key={i} columns={cols} />
        ))}
      </tbody>
    </table>
  );
}


const LeaderboardPage = () => {
  const { data: lb, isLoading: lbLoading, error: lbError } = useLeaderboard();
  const { data: live, isLoading: liveLoading, error: liveError } = useLive();

  const topKiller = lb?.topKills?.[0];
  const topMedic = lb?.topMedics?.[0];

  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="container mx-auto px-4 md:px-8 pt-40">

        <SectionHeader
          title="Server Stats"
          subtitle="Server statistics from the last 6 months."
          accent="Leaderboard"
        />

        {/* Stats Row */}
        <section className="mb-16">
          {lbLoading || liveLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-gray-50 animate-pulse border-l-4 border-gray-200" />
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
              />
              <StatBox
                label="Top Medic"
                value={topMedic?.name ?? '—'}
                suffix={topMedic ? ` (${topMedic.revives.toLocaleString()})` : ''}
              />
            </div>
          )}
        </section>

        {/* Current Match */}
        <section className="mb-16">
          {liveError && <ErrorBox message={String(liveError)} />}
          {liveLoading && <SkeletonBlock rows={2} cols={4} />}
          {live?.currentMatch && (
            <Card title="Current Match">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
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
                    <span className="text-sm text-gray-500">{live.currentMatch.map}</span>
                    {live.currentMatch.layerClassname && (
                      <span className="text-xs text-gray-300 font-mono">{live.currentMatch.layerClassname}</span>
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
          {lbError && <ErrorBox message={String(lbError)} />}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Most Kills */}
            <Card title="Most Kills">
              {lbLoading && <SkeletonBlock rows={10} cols={2} />}
              {lb?.topKills && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3 pr-4">#</th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Player</th>
                      <th className="text-right text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Kills</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lb.topKills.map((entry, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 pr-4 text-sm font-black text-gray-300 w-8">
                          {i + 1}
                        </td>
                        <td className="py-3 text-sm font-bold tracking-tight">
                          {entry.name}
                        </td>
                        <td className="py-3 text-right text-sm font-black tabular-nums">
                          {entry.kills.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>

            {/* Top Medics */}
            <Card title="Top Medic">
              {lbLoading && <SkeletonBlock rows={10} cols={2} />}
              {lb?.topMedics && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3 pr-4">#</th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Player</th>
                      <th className="text-right text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Revives</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lb.topMedics.map((entry, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 pr-4 text-sm font-black text-gray-300 w-8">
                          {i + 1}
                        </td>
                        <td className="py-3 text-sm font-bold tracking-tight">
                          {entry.name}
                        </td>
                        <td className="py-3 text-right text-sm font-black tabular-nums">
                          {entry.revives.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>
          </div>
        </section>

        {/* Recent Match History */}
        <section className="mb-16">
          <Card title="Recent Matches">
            {liveError && <ErrorBox message={String(liveError)} />}
            {liveLoading && <SkeletonBlock rows={6} cols={5} />}
            {live?.recentMatches && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Layer</th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Start</th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">End</th>
                      <th className="text-left text-[10px] font-black uppercase tracking-widest text-gray-400 pb-3">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {live.recentMatches.map((m, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
