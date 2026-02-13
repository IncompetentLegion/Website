import React from 'react';
import { Badge } from '../components/UI';
import { SeasonStats, AllTimeStats, PlayerInfo } from '../types';

interface StatRowProps {
  label: string;
  value: string | number;
  rank?: number;
}

const StatRow: React.FC<StatRowProps> = ({ label, value, rank }) => (
  <div className="flex justify-between items-center py-3 3xl:py-4 4xl:py-5 border-b border-gray-100 last:border-0">
    <span className="text-[10px] 3xl:text-xs 4xl:text-sm font-black uppercase tracking-widest text-gray-400">{label}</span>
    <div className="flex items-center gap-3">
      <span className="font-black text-sm 3xl:text-base 4xl:text-lg">{value}</span>
      {rank !== undefined && rank > 0 && (
        <span className="text-[9px] 3xl:text-[11px] 4xl:text-xs font-bold text-gray-400">(Ranked: {rank.toLocaleString()})</span>
      )}
    </div>
  </div>
);

interface HighlightRowProps {
  label: string;
  name: string;
  detail: string;
}

const HighlightRow: React.FC<HighlightRowProps> = ({ label, name, detail }) => (
  <div className="flex justify-between items-center py-3 3xl:py-4 4xl:py-5 border-b border-gray-100 last:border-0">
    <span className="text-[10px] 3xl:text-xs 4xl:text-sm font-black uppercase tracking-widest text-gray-400">{label}</span>
    <div className="flex items-center gap-2">
      <span className="font-black text-sm 3xl:text-base 4xl:text-lg text-[#e10600]">{name}</span>
      <span className="text-[9px] 3xl:text-[11px] 4xl:text-xs font-bold text-gray-400">{detail}</span>
    </div>
  </div>
);

interface PlayerProfileProps {
  info: PlayerInfo;
  seasonStats: SeasonStats | null;
  allTimeStats: AllTimeStats | null;
  activeView: 'season' | 'alltime';
  seasonName: string;
  onToggleView: (view: 'season' | 'alltime') => void;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ info, seasonStats, allTimeStats, activeView, seasonName, onToggleView }) => {
  const s = seasonStats;
  const a = allTimeStats;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      {/* Header Card */}
      <div className="bg-black text-white p-10 border-b-8 border-[#e10600] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
        <Badge color="red">Level {info.level}</Badge>
        <h3 className="text-4xl 3xl:text-5xl 4xl:text-6xl font-black uppercase tracking-tighter mt-4 mb-2">{info.lastName}</h3>
        <p className="text-xs 3xl:text-sm 4xl:text-base font-mono text-gray-500 uppercase tracking-widest mb-6">STEAM_ID: {info.steamID}</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-2xl 3xl:text-3xl 4xl:text-4xl font-black text-[#e10600]">{info.playerTotalScore?.toLocaleString() ?? 0}</span>
            <span className="text-[9px] 3xl:text-xs 4xl:text-sm font-bold text-gray-500 uppercase tracking-widest">Total Score</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl 3xl:text-3xl 4xl:text-4xl font-black text-white">{info.level}</span>
            <span className="text-[9px] 3xl:text-xs 4xl:text-sm font-bold text-gray-500 uppercase tracking-widest">Level</span>
          </div>
          {info.lastSeenServer && (
            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="text-xs 3xl:text-sm 4xl:text-base font-black text-gray-400 truncate">{info.lastSeenServer.name.split('|')[0].trim()}</span>
              <span className="text-[9px] 3xl:text-xs 4xl:text-sm font-bold text-gray-500 uppercase tracking-widest">Last Server</span>
            </div>
          )}
        </div>
      </div>

      {/* Toggle */}
      <div className="flex border-2 border-black">
        <button
          onClick={() => onToggleView('season')}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${
            activeView === 'season' ? 'bg-[#e10600] text-white' : 'bg-white text-black hover:bg-gray-50'
          }`}
        >
          {seasonName || 'Current Season'}
        </button>
        <button
          onClick={() => onToggleView('alltime')}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${
            activeView === 'alltime' ? 'bg-[#e10600] text-white' : 'bg-white text-black hover:bg-gray-50'
          }`}
        >
          All Time
        </button>
      </div>

      {/* Stats Grid */}
      {activeView === 'season' && s ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Combat Stats */}
          <div className="bg-white border-2 border-black p-8 relative">
            <div className="absolute -top-4 left-8 bg-[#e10600] text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Combat Stats</div>
            <div className="mt-2">
              <StatRow label="Wounds" value={s.seasonWounds} rank={s.seasonWoundsRank} />
              <StatRow label="Kills" value={s.seasonKills} rank={s.seasonKillsRank} />
              <StatRow label="Deaths" value={s.seasonDeaths} rank={s.seasonDeathsRank} />
              <StatRow label="K/D Ratio" value={s.seasonKdRatio?.toFixed(2)} rank={s.seasonKdRatioRank} />
              <StatRow label="Revives" value={s.seasonRevives} rank={s.seasonRevivesRank} />
              <StatRow label="Times Revived" value={s.seasonTimesRevived} rank={s.seasonTimesRevivedRank} />
              <StatRow label="Teamkills" value={s.seasonTks} rank={s.seasonTksRank} />
              <StatRow label="Times Teamkilled" value={s.seasonTkd} rank={s.seasonTkdRank} />
              <StatRow label="Highest Killstreak" value={s.seasonHighestKillstreak} rank={s.seasonHighestKillstreakRank} />
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white border-2 border-black p-8 relative">
            <div className="absolute -top-4 left-8 bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Highlights</div>
            <div className="mt-2">
              {s.seasonFavoriteWeapon && (
                <HighlightRow label="Favorite Weapon" name={s.seasonFavoriteWeapon.replace(/^BP_/, '').replace(/_/g, ' ')} detail={`(${s.seasonFavoriteWeaponCount} Wounds)`} />
              )}
              {s.seasonTopVictimName && (
                <HighlightRow label="Top Victim" name={s.seasonTopVictimName} detail={`${s.seasonTopVictimCount} Times`} />
              )}
              {s.seasonTopNemesisName && (
                <HighlightRow label="Top Nemesis" name={s.seasonTopNemesisName} detail={`${s.seasonTopNemesisCount} Times`} />
              )}
              {s.seasonTopRevivedName && (
                <HighlightRow label="Top Revived" name={s.seasonTopRevivedName} detail={`${s.seasonTopRevivedCount} Times`} />
              )}
              {s.seasonTopReviverName && (
                <HighlightRow label="Top Reviver" name={s.seasonTopReviverName} detail={`${s.seasonTopReviverCount} Times`} />
              )}
              <StatRow label="Season Score" value={s.seasonScore?.toLocaleString()} rank={s.seasonScoreRank} />
            </div>
          </div>
        </div>
      ) : activeView === 'season' && !s ? (
        <div className="border-2 border-dashed border-gray-300 p-12 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">No season data available for this player.</span>
        </div>
      ) : null}

      {activeView === 'alltime' && a ? (
        <div className="bg-white border-2 border-black p-8 relative">
          <div className="absolute -top-4 left-8 bg-[#e10600] text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em]">All Time Stats</div>
          <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-x-12">
            <div>
              <StatRow label="Wounds" value={a.totalWounds} rank={a.totalWoundsRank} />
              <StatRow label="Kills" value={a.totalKills} rank={a.totalKillsRank} />
              <StatRow label="Deaths" value={a.totalDeaths} rank={a.totalDeathsRank} />
              <StatRow label="K/D Ratio" value={a.totalKdRatio?.toFixed(2)} rank={a.totalKdRatioRank} />
              <StatRow label="Total Score" value={a.totalScore?.toLocaleString()} rank={a.totalScoreRank} />
            </div>
            <div>
              <StatRow label="Revives" value={a.totalRevives} rank={a.totalRevivesRank} />
              <StatRow label="Times Revived" value={a.totalTimesRevived} rank={a.totalTimesRevivedRank} />
              <StatRow label="Teamkills" value={a.totalTks} rank={a.totalTksRank} />
              <StatRow label="Times Teamkilled" value={a.totalTkd} rank={a.totalTkdRank} />
              <StatRow label="Highest Killstreak" value={a.highestKillstreak} rank={a.highestKillstreakRank} />
            </div>
          </div>
        </div>
      ) : activeView === 'alltime' && !a ? (
        <div className="border-2 border-dashed border-gray-300 p-12 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">No all-time data available for this player.</span>
        </div>
      ) : null}
    </div>
  );
};

export default PlayerProfile;
