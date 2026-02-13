
import React, { useState } from 'react';
import { SectionHeader, Button, Card } from '../components/UI';
import { DetailedPlayerProfile, WeaponStat, RibbonStat } from '../types';
import { mssApi } from '../services/api';
import PlayerProfile from '../components/PlayerProfile';
import consImg from '../src/assets/cons.webp';

const LeaderboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [profile, setProfile] = useState<DetailedPlayerProfile | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'season' | 'alltime'>('season');
  const [seasonName, setSeasonName] = useState<string>('');

  const handlePlayerSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    setSearchError(null);
    setProfile(null);

    try {
      const info = await mssApi.searchPlayers(searchQuery);
      if (!info) {
        setSearchError("No operator found matching these credentials.");
        return;
      }

      const [seasonResult, allTimeStats, weapons, ribbons] = await Promise.all([
        mssApi.getPlayerSeasonStats(info.steamID),
        mssApi.getPlayerAllTimeStats(info.steamID),
        mssApi.getPlayerWeapons(info.steamID),
        mssApi.getPlayerRibbons(info.steamID),
      ]);

      const seasonStats = seasonResult.stats;
      setSeasonName(seasonResult.seasonName);

      setProfile({ info, seasonStats, allTimeStats, weapons, ribbons });
    } catch (err) {
      console.error(err);
      setSearchError("Failed to access encrypted database.");
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="container mx-auto px-4 md:px-8 pt-40">
        
        {/* SECTION: Seeding */}
        <section className="mb-24">
          <SectionHeader 
            title="Top Seeders" 
            subtitle="The backbone of our community" 
            accent="Seeding"
          />
          <div className="relative border-4 border-black border-dashed p-20 flex flex-col items-center justify-center bg-gray-50 group overflow-hidden">
             <img src={consImg} alt="Under Construction" className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" />
             <div className="w-16 h-1 bg-[#e10600] mb-6 animate-pulse"></div>
             <span className="text-sm font-black uppercase tracking-[0.5em] text-gray-400 group-hover:text-black transition-colors">
               Operational Data Stream Pending...
             </span>
             <p className="mt-4 text-[10px] font-bold text-gray-300 uppercase">Live server population tracking will be integrated here.</p>
          </div>
        </section>

        {/* SECTION: Player Stats Breakdown */}
        <section className="mb-24">
          <SectionHeader 
            title="Player Lookup" 
            subtitle="Access detailed combat archives for any player. (MySquadStats)" 
            accent="Stats"
          />
          
          <Card className="mb-8">
            <form onSubmit={handlePlayerSearch} className="flex flex-col md:flex-row gap-6">
                <div className="flex-grow relative">
                    <input 
                        type="text" 
                        placeholder="ENTER STEAMID..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-8 py-5 border-2 border-black focus:outline-none focus:border-[#e10600] font-black text-sm placeholder:text-gray-300 uppercase tracking-widest"
                    />
                    {searching && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                         <div className="w-6 h-6 border-2 border-[#e10600] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                </div>
                <Button type="submit" variant="black" size="lg" disabled={searching}>
                  Retrieve Data
                </Button>
            </form>
            {searchError && (
              <p className="mt-4 text-xs font-black text-[#e10600] uppercase tracking-widest">{searchError}</p>
            )}
          </Card>

          {profile && (
            <PlayerProfile
              info={profile.info}
              seasonStats={profile.seasonStats}
              allTimeStats={profile.allTimeStats}
              activeView={activeView}
              seasonName={seasonName}
              onToggleView={setActiveView}
            />
          )}

          {/* Weapons & Ribbons */}
          {profile && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Top Weapons */}
              <Card title="Top Weapons">
                <div className="space-y-0">
                  {profile.weapons.length > 0 ? profile.weapons.slice(0, 8).map((w, i) => (
                    <div key={i} className="flex justify-between items-center py-3 3xl:py-4 4xl:py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 -mx-2 transition-colors">
                      <span className="text-xs 3xl:text-sm 4xl:text-base font-black uppercase tracking-tight">{w.weaponName.replace(/^BP_/, '').replace(/_/g, ' ')}</span>
                      <div className="flex gap-6">
                        <div className="text-right">
                          <span className="text-sm 3xl:text-base 4xl:text-lg font-black">{w.woundsCount ?? w.wounds ?? 0}</span>
                          <span className="text-[8px] 3xl:text-[10px] 4xl:text-xs font-bold text-gray-400 uppercase ml-1">Wounds</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm 3xl:text-base 4xl:text-lg font-black text-[#e10600]">{(w.damageDealt ?? 0).toLocaleString()}</span>
                          <span className="text-[8px] 3xl:text-[10px] 4xl:text-xs font-bold text-gray-400 uppercase ml-1">Dmg</span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-400 uppercase font-black text-xs py-6">No weapon data reported.</p>
                  )}
                </div>
              </Card>

              {/* Ribbons */}
              <Card title="Honors & Ribbons">
                <div className="grid grid-cols-2 gap-4">
                  {profile.ribbons.length > 0 ? profile.ribbons.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 3xl:gap-4 4xl:gap-5 p-3 3xl:p-4 4xl:p-5 border border-gray-100 hover:border-[#e10600] transition-colors">
                      <div className="w-8 h-8 3xl:w-10 3xl:h-10 4xl:w-12 4xl:h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 text-[#e10600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-[10px] 3xl:text-xs 4xl:text-sm font-black uppercase leading-tight block">{r.ribbonName}</span>
                        <span className="text-[9px] 3xl:text-[11px] 4xl:text-xs text-gray-400">x{r.timesAwarded}</span>
                      </div>
                    </div>
                  )) : (
                    <p className="text-gray-400 uppercase font-black text-xs py-6 col-span-2">No honors bestowed yet.</p>
                  )}
                </div>
              </Card>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default LeaderboardPage;
