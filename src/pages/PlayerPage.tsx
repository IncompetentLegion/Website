import { useParams, Link } from 'react-router-dom';
import { SectionHeader, StatBox, Card, ErrorBox, SkeletonBlock } from '../components/UI';
import { usePlayerStats } from '../hooks/usePlayerStats';


const PlayerPage = () => {
  const { steamId } = useParams<{ steamId: string }>();
  const { data: player, isLoading, error } = usePlayerStats(steamId ?? '');

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

        <SectionHeader
          title={isLoading ? 'Loading...' : (player?.name ?? 'Unknown Player')}
          accent="Player Stats"
          titleClassName="text-3xl sm:text-5xl md:text-7xl 3xl:text-8xl 4xl:text-9xl"
        />

        <div className="mb-8">
          <Link
            to="/leaderboard"
            className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#e10600] transition-colors"
          >
            &larr; Back to Leaderboard
          </Link>
        </div>

        {error && <ErrorBox message={String(error)} />}

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
                {player.topVictim && (
                  <StatBox
                    label="Favourite Victim"
                    value={player.topVictim.name}
                    suffix={` (${player.topVictim.kills})`}
                    href={`/player/${player.topVictim.steamID}`}
                  />
                )}
                {player.nemesis && (
                  <StatBox
                    label="Nemesis"
                    value={player.nemesis.name}
                    suffix={` (${player.nemesis.kills})`}
                    href={`/player/${player.nemesis.steamID}`}
                  />
                )}
                {player.mostRevived && (
                  <StatBox
                    label="Most Revived"
                    value={player.mostRevived.name}
                    suffix={` (${player.mostRevived.revives})`}
                    href={`/player/${player.mostRevived.steamID}`}
                  />
                )}
                {player.mostRevivedBy && (
                  <StatBox
                    label="Most Revived By"
                    value={player.mostRevivedBy.name}
                    suffix={` (${player.mostRevivedBy.revives})`}
                    href={`/player/${player.mostRevivedBy.steamID}`}
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
