
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader, Card, Badge, StatBox, ErrorBox, SkeletonBlock } from '../components/UI';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { useLive } from '../hooks/useLive';
import { usePlayerSearch } from '../hooks/usePlayerSearch';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}


function PlayerSearch() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data: results, isLoading } = usePlayerSearch(query);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(input.trim()), 300);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    if (query.length >= 3) setOpen(true);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full md:w-72">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search player..."
        className="w-full border-2 border-black dark:border-gray-600 bg-white dark:bg-[#1a1a1a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black dark:text-gray-200 placeholder-gray-400 outline-none focus:border-[#e10600] transition-colors"
      />
      {open && query.length >= 3 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 border-2 border-black dark:border-gray-600 bg-white dark:bg-[#1a1a1a] shadow-lg max-h-60 overflow-y-auto">
          {isLoading && (
            <div className="px-4 py-3 text-xs text-gray-400 uppercase tracking-wider">Searching...</div>
          )}
          {results && results.length === 0 && (
            <div className="px-4 py-3 text-xs text-gray-400 uppercase tracking-wider">No players found</div>
          )}
          {results?.map(p => (
            <Link
              key={p.steamID}
              to={`/player/${p.steamID}`}
              onClick={() => { setOpen(false); setInput(''); }}
              className="block px-4 py-3 text-sm font-bold tracking-tight hover:bg-gray-50 dark:hover:bg-[#141414] transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              {p.lastName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const LeaderboardPage = () => {
  const { data: lb, isLoading: lbLoading, error: lbError } = useLeaderboard();
  const { data: live, isLoading: liveLoading, error: liveError } = useLive();

  const topKiller = lb?.topKills?.[0];
  const topMedic = lb?.topMedics?.[0];

  return (
    <div className="bg-white dark:bg-[#0f0f0f] min-h-screen pb-32">
      <div className="container mx-auto px-4 md:px-8 pt-40">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-16">
          <SectionHeader
            title="Server Stats"
            subtitle="Server statistics from the last 6 months."
            accent="Leaderboard"
            className="mb-0"
          />
          <div className="shrink-0 md:pt-8">
            <PlayerSearch />
          </div>
        </div>

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
                href={topKiller ? `/player/${topKiller.steamID}` : undefined}
              />
              <StatBox
                label="Top Medic"
                value={topMedic?.name ?? '—'}
                suffix={topMedic ? ` (${topMedic.revives.toLocaleString()})` : ''}
                href={topMedic ? `/player/${topMedic.steamID}` : undefined}
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
          {lbError && <ErrorBox message={String(lbError)} />}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Most Kills */}
            <Card title="Most Kills">
              {lbLoading && <SkeletonBlock rows={10} cols={2} />}
              {lb?.topKills && (
                <table className="w-full">
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
                          <Link to={`/player/${entry.steamID}`} className="hover:text-[#e10600] transition-colors">
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
              )}
            </Card>

            {/* Top Medics */}
            <Card title="Top Medic">
              {lbLoading && <SkeletonBlock rows={10} cols={2} />}
              {lb?.topMedics && (
                <table className="w-full">
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
                          <Link to={`/player/${entry.steamID}`} className="hover:text-[#e10600] transition-colors">
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
