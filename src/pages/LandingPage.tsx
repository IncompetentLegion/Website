
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, SectionHeader, DividerSVG, Badge } from '../components/UI';
import logoRes from '../assets/logores.webp';
import heroBan from '../assets/heroban.webp';
import squadOfficialLogo from '../assets/squad-official-logo.webp';
import supermodLogoSmall from '../assets/supermod-logo-small.webp';

const preSummerStats = [
  {
    value: '23,754',
    label: 'Unique SteamIDs',
  },
  {
    value: '840',
    label: 'Matches',
  },
  {
    value: '599.8h',
    label: 'Hours',
  },
  {
    value: '201,077',
    label: 'Kills',
  },
  {
    value: '64,444',
    label: 'Revives',
  },
  {
    value: '217',
    label: 'Layers',
  },
] as const;

const monthlyActivity = [
  { month: 'February', matches: '136', kills: '30.8k', revives: '10.4k', avgPlayers: '22.5', width: '53%' },
  { month: 'March', matches: '257', kills: '62.0k', revives: '21.4k', avgPlayers: '23.8', width: '100%' },
  { month: 'April', matches: '252', kills: '58.9k', revives: '18.7k', avgPlayers: '14.5', width: '98%' },
  { month: 'May', matches: '195', kills: '49.4k', revives: '14.0k', avgPlayers: '9.5', width: '76%' },
] as const;

const playerHighlights = [
  { label: 'Kills', player: 'SCAMERA Jake', value: '2,312' },
  { label: 'Revives', player: 'в³ +JackTheMedic+', value: '1,029' },
  { label: 'Damage', player: 'SCAMERA Jake', value: '385,161' },
] as const;

const eloHighlights = [
  { label: 'Top Rating', player: '[PACK] Sapper Rat', value: '13.33' },
  { label: 'Most Rounds', player: '[PACK] Myszo', value: '85' },
  { label: 'Best Win Rate', player: '[PACK] Sapper Rat', value: '77.5%' },
] as const;

const clanHighlights = [
  {
    tag: '[PACK]',
    rows: [
      { label: 'Top rating', value: 'Sapper Rat 13.33' },
      { label: 'Most ELO rounds', value: 'Myszo 85' },
      { label: 'Best win rate', value: 'Sapper Rat 77.5%' },
    ],
  },
  {
    tag: 'в³',
    rows: [
      { label: 'Kills', value: 'Gwadien 1,505' },
      { label: 'Revives', value: '+JackTheMedic+ 1,029' },
      { label: 'Damage', value: 'Gwadien 222,752' },
    ],
  },
  {
    tag: '[NKLK]',
    rows: [
      { label: 'Kills', value: 'Tihu 1,394' },
      { label: 'Kills', value: 'Debe 1,333' },
      { label: 'Revives', value: 'MuumiPeikko 414' },
    ],
  },
  {
    tag: '[SETA]',
    rows: [
      { label: 'Kills', value: 'Brushieee 1,054' },
      { label: 'Kills', value: 'Wikingg 1,041' },
      { label: 'ELO win rate', value: 'Japaleno 76.5%' },
    ],
  },
] as const;

const clanEloRankings = [
  { rank: 1, tag: 'PACK', rating: '6.7 CSR', size: '9m', wr: '70%' },
  { rank: 2, tag: 'NKLK', rating: '4.5 CSR', size: '8m', wr: '61%' },
  { rank: 3, tag: 'S²', rating: '4.4 CSR', size: '5m', wr: '63%' },
  { rank: 4, tag: 'NORD', rating: '4.1 CSR', size: '7m', wr: '67%' },
  { rank: 5, tag: 'SETA', rating: '3.4 CSR', size: '14m', wr: '60%' },
  { rank: 6, tag: '13.Jg', rating: '2.7 CSR', size: '37m', wr: '56%' },
  { rank: 7, tag: 'JWP', rating: '2.4 CSR', size: '11m', wr: '60%' },
  { rank: 8, tag: '♣ΛCE', rating: '2.4 CSR', size: '13m', wr: '67%' },
  { rank: 9, tag: 'SL', rating: '2.0 CSR', size: '3m', wr: '41%' },
  { rank: 10, tag: 'в³', rating: '1.7 CSR', size: '22m', wr: '52%' },
  { rank: 11, tag: 'BOOG', rating: '1.5 CSR', size: '12m', wr: '53%' },
  { rank: 12, tag: 'SWE', rating: '1.2 CSR', size: '3m', wr: '46%' },
  { rank: 13, tag: '4K', rating: '1.0 CSR', size: '5m', wr: '70%' },
  { rank: 14, tag: '✯RNL', rating: '0.9 CSR', size: '7m', wr: '36%' },
  { rank: 15, tag: 'SG', rating: '0.8 CSR', size: '5m', wr: '59%' },
  { rank: 16, tag: 'ULF', rating: '0.5 CSR', size: '8m', wr: '62%' },
  { rank: 17, tag: '44th', rating: '0.2 CSR', size: '28m', wr: '42%' },
  { rank: 18, tag: 'TONK', rating: '0.1 CSR', size: '3m', wr: '34%' },
  { rank: 19, tag: '✯RAIDR', rating: '-0.0 CSR', size: '15m', wr: '44%' },
  { rank: 20, tag: 'TC', rating: '-0.4 CSR', size: '4m', wr: '54%' },
  { rank: 21, tag: 'pS', rating: '-0.6 CSR', size: '3m', wr: '33%' },
  { rank: 22, tag: 'SLAP', rating: '-1.2 CSR', size: '11m', wr: '26%' },
  { rank: 23, tag: 'FR', rating: 'n/a CSR', size: '6m', wr: '60%' },
  { rank: 24, tag: 'ITA', rating: 'n/a CSR', size: '7m', wr: '50%' },
  { rank: 25, tag: 'Snaik', rating: 'n/a CSR', size: '11m', wr: '22%' },
] as const;

const LandingPage: React.FC = () => {
  const HERO_IMAGE_URL = logoRes;
  const WHO_ARE_WE_BANNER_URL = heroBan;
  const VANILLA_LOGO_URL = squadOfficialLogo;
  const SUPERMOD_LOGO_URL = supermodLogoSmall;

  return (
    <div className="overflow-hidden bg-white dark:bg-[#0f0f0f]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 md:pt-28 pb-12 md:pb-0">
        <div className="absolute inset-0 bg-grid opacity-[0.05]"></div>
        <div className="absolute inset-0 topo-pattern"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full bg-[#e10600]/5 dark:bg-[#e10600]/10 -skew-x-12 hidden lg:block"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 border-[60px] border-black/5 dark:border-white/5 rounded-full hidden lg:block"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 3xl:max-w-[1920px] 4xl:max-w-[1920px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 3xl:gap-8 4xl:gap-8">
            <div className="flex-1 text-center lg:text-left">
                
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[120px] 3xl:text-[140px] 4xl:text-[160px] font-black uppercase tracking-tighter leading-[0.8] mb-6 md:mb-8 text-black dark:text-gray-200">
                  <br/>
                  <span className="text-black dark:text-gray-200 hero-text-stroke">INCOMPETENT</span><br/>
                  <span className="text-[#e10600]">LEGION</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-2xl 3xl:text-3xl 4xl:text-4xl font-medium text-gray-500 dark:text-gray-400 mb-8 md:mb-12 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  IL is taking a summer break. Discord stays open, and we will post there when the servers are coming back.
                  Keep notifications on if you want the restart announcement. We will not spam you.
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
                  <a href="https://discord.gg/2xKx4NcwRm" target="_blank" rel="noreferrer"><Button size="lg" variant="primary">Discord</Button></a>
                  <a href="#pre-summer-report"><Button size="lg" variant="outline">First Half Stats</Button></a>
                </div>
            </div>

            <div className="flex-1 relative hidden lg:block 3xl:max-w-[500px] 4xl:max-w-[500px]">
                <div className="relative z-20 shadow-2xl transition-all duration-700 bg-white dark:bg-[#1a1a1a] p-6">
                    <img 
                      src={HERO_IMAGE_URL} 
                      alt="Incompetent Legion Official Asset" 
                      className="w-full h-auto aspect-square object-contain"
                    />
                    <div className="absolute -bottom-10 -right-10 bg-[#e10600] p-10 text-white shadow-2xl rotate-2">
                        <p className="text-xl font-black uppercase tracking-widest italic">"Ape together strong"</p>
                    </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <DividerSVG className="text-black dark:text-[#0f0f0f]" />

      <section id="pre-summer-report" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.08]"></div>
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[#e10600]/10 -skew-x-12 translate-x-1/3 hidden lg:block"></div>
        <div className="absolute top-8 right-6 md:right-12 text-[110px] md:text-[220px] font-black leading-none text-white/[0.03] select-none">
          2026
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-10 xl:gap-16 items-end mb-12 md:mb-16">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Badge color="red">Summer Break</Badge>
                <Badge color="gray">First Half Stats</Badge>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.28em] text-gray-500">
                  2026
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl 3xl:text-8xl font-black uppercase tracking-tighter leading-none mb-8 max-w-5xl">
                We are taking a summer break. <span className="text-[#e10600]">Here are the first half stats.</span>
              </h2>

              <p className="text-base md:text-xl font-medium leading-relaxed text-gray-300 max-w-3xl">
                Summer is usually slower. With fewer players around, seeding can take hours and still
                only lead to a handful of proper games. Rather than pushing through that every week,
                we are pausing the servers for now and will restart when it makes sense again.
              </p>
            </div>

            <div className="border-2 border-white/10 bg-white/[0.03] p-8 md:p-10 shadow-[12px_12px_0px_rgba(225,6,0,0.25)]">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#e10600] mb-3">
                    Combined Vanilla + Supermod
                  </p>
                  <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
                    First half of 2026.
                  </p>
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40 border border-white/10 px-3 py-2">
                  YTD
                </span>
              </div>

              <div className="text-[72px] sm:text-[92px] md:text-[112px] font-black tracking-tighter leading-[0.8]">
                599.8<span className="text-3xl md:text-5xl text-[#e10600]">h</span>
              </div>
              <p className="mt-5 text-sm md:text-base font-black uppercase tracking-[0.26em] text-gray-500">
                Hours played
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-8">
            {preSummerStats.map((stat) => (
              <div key={stat.label} className="bg-white text-black dark:bg-[#111111] dark:text-white border-2 border-white/10 p-6 md:p-7 min-h-[160px] flex flex-col justify-between">
                <div className="text-4xl md:text-5xl font-black tracking-tighter leading-none text-[#e10600]">
                  {stat.value}
                </div>
                <div className="mt-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.24em] text-black dark:text-gray-200">
                    {stat.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <div className="border-2 border-white/10 bg-[#0f0f0f] p-6 md:p-8">
              <div className="flex items-end justify-between gap-4 mb-6">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  Leaders
                </h3>
                <span className="text-[10px] font-black uppercase tracking-[0.26em] text-gray-600">
                  Combined
                </span>
              </div>

              <div className="divide-y divide-white/10">
                {playerHighlights.map((entry) => (
                  <div key={entry.label} className="grid grid-cols-[92px_1fr_auto] gap-4 py-4 items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">
                      {entry.label}
                    </span>
                    <span className="text-sm md:text-base font-black text-white truncate">
                      {entry.player}
                    </span>
                    <span className="text-lg md:text-2xl font-black tracking-tighter text-[#e10600] tabular-nums">
                      {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-white/10 bg-[#0f0f0f] p-6 md:p-8">
              <div className="flex items-end justify-between gap-4 mb-6">
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  ELO
                </h3>
                <span className="text-[10px] font-black uppercase tracking-[0.26em] text-gray-600">
                  Backup
                </span>
              </div>

              <div className="divide-y divide-white/10">
                {eloHighlights.map((entry) => (
                  <div key={entry.label} className="grid grid-cols-[110px_1fr_auto] gap-4 py-4 items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">
                      {entry.label}
                    </span>
                    <span className="text-sm md:text-base font-black text-white truncate">
                      {entry.player}
                    </span>
                    <span className="text-lg md:text-2xl font-black tracking-tighter text-[#e10600] tabular-nums">
                      {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-2 border-white/10 bg-[#0f0f0f] p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                  Clan Highlights
                </h3>
                <p className="mt-3 text-sm font-medium text-gray-500">
                  Tag-based highlights from the first half stats.
                </p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.26em] text-gray-600">
                Player tags
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {clanHighlights.map((clan) => (
                <div key={clan.tag} className="border border-white/10 bg-black/30 p-5">
                  <div className="text-2xl md:text-3xl font-black tracking-tighter text-[#e10600] mb-4">
                    {clan.tag}
                  </div>
                  <div className="space-y-3">
                    {clan.rows.map((row) => (
                      <div key={`${clan.tag}-${row.label}-${row.value}`}>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-600">
                          {row.label}
                        </p>
                        <p className="mt-1 text-sm font-black text-white truncate">
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b-2 border-white/20">
                    <th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 pb-3 pr-4">#</th>
                    <th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 pb-3 pr-4">Clan</th>
                    <th className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 pb-3 pr-4">Rating</th>
                    <th className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 pb-3 pr-4">Size</th>
                    <th className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 pb-3">WR</th>
                  </tr>
                </thead>
                <tbody>
                  {clanEloRankings.map((clan) => (
                    <tr key={`${clan.rank}-${clan.tag}`} className="border-b border-white/10">
                      <td className="py-3 pr-4 text-sm font-black text-gray-600 tabular-nums">
                        {clan.rank}
                      </td>
                      <td className="py-3 pr-4 text-sm font-black text-white">
                        {clan.tag}
                      </td>
                      <td className="py-3 pr-4 text-right text-sm font-black text-[#e10600] tabular-nums">
                        {clan.rating}
                      </td>
                      <td className="py-3 pr-4 text-right text-sm font-black text-gray-400 tabular-nums">
                        {clan.size}
                      </td>
                      <td className="py-3 text-right text-sm font-black text-gray-400 tabular-nums">
                        {clan.wr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-8">
            <div className="border-2 border-white/10 bg-[#0f0f0f] p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                    Month By Month
                  </h3>
                  <p className="mt-3 text-sm font-medium text-gray-500">
                    Matches, kills, revives, and average player count.
                  </p>
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.26em] text-gray-600">
                  Combined servers
                </span>
              </div>

              <div className="space-y-5">
                {monthlyActivity.map((month) => (
                  <div key={month.month}>
                    <div className="grid grid-cols-[88px_1fr] md:grid-cols-[120px_1fr] gap-4 items-center">
                      <div>
                        <p className="text-sm md:text-base font-black uppercase tracking-tighter">
                          {month.month}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                          Avg {month.avgPlayers}
                        </p>
                      </div>
                      <div>
                        <div className="h-4 bg-white/10 relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-[#e10600]" style={{ width: month.width }}></div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] md:text-xs font-black uppercase tracking-[0.12em] text-gray-500">
                          <span>{month.matches} matches</span>
                          <span>{month.kills} kills</span>
                          <span>{month.revives} revives</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#e10600] p-6 md:p-8 text-white flex flex-col justify-between min-h-[360px]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.32em] text-white/60 mb-6">
                  Server status
                </p>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-8">
                  Paused for summer.
                </h3>
              </div>

              <div className="space-y-5">
                {[
                  'The Discord stays open.',
                  'We will post there when the servers restart.',
                  'Keep notifications on if you want that update. We will not spam you.',
                ].map((item) => (
                  <div key={item} className="flex gap-4">
                    <div className="w-2 h-2 min-w-[8px] min-h-[8px] bg-white mt-2"></div>
                    <p className="text-sm md:text-base font-bold leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DividerSVG flipped className="text-black dark:text-black" bgClassName="bg-[#f8f8f8] dark:bg-[#141414]" />

      <section className="py-24 md:py-32 bg-[#f8f8f8] dark:bg-[#141414] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.04]"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader
            title={"Two Servers One\u00A0Community"}
            subtitle="Incompetent Legion runs both a classic Vanilla server and a dedicated Supermod server. Pick the style you want without leaving the community."
            accent="Server Modes"
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
            <div className="bg-white dark:bg-[#1a1a1a] border-2 border-black dark:border-gray-700 p-8 md:p-10 shadow-[12px_12px_0px_rgba(0,0,0,0.06)] flex flex-col h-full">
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <Badge color="black">Vanilla</Badge>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-4 mb-3 text-black dark:text-gray-200">
                    Classic Squad
                  </h3>
                  <p className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                    Standard Squad pacing, familiar factions, and the core experience most players already know. This is the default server for players who want the established game flow.
                  </p>
                </div>
                <div className="hidden sm:flex h-16 w-16 md:h-20 md:w-20 items-center justify-center border-2 border-black dark:border-gray-700 bg-[#f8f8f8] dark:bg-[#111111] p-3 shrink-0">
                  <img
                    src={VANILLA_LOGO_URL}
                    alt="Squad official logo"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="border-l-4 border-black dark:border-gray-500 pl-4 py-2">
                  <span className="block text-2xl font-black tracking-tighter text-black dark:text-gray-200">Core</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Gameplay</span>
                </div>
                <div className="border-l-4 border-black dark:border-gray-500 pl-4 py-2">
                  <span className="block text-2xl font-black tracking-tighter text-black dark:text-gray-200">Known</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Layers</span>
                </div>
                <div className="border-l-4 border-black dark:border-gray-500 pl-4 py-2">
                  <span className="block text-2xl font-black tracking-tighter text-black dark:text-gray-200">Default</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Experience</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  'Standard Squad gameplay and familiar match pacing.',
                  'Best fit if you want the classic public-server experience.',
                  'Vanilla leaderboard and player stats are tracked separately from Supermod.',
                ].map((item) => (
                  <div key={item} className="flex gap-4 group">
                    <div className="w-1.5 h-1.5 min-w-[6px] min-h-[6px] bg-black mt-2"></div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <Link to="/leaderboard?mode=vanilla" className="inline-flex mt-auto">
                <Button variant="black" size="lg">View Vanilla Stats</Button>
              </Link>
            </div>

            <div className="bg-black text-white border-2 border-black dark:border-gray-700 p-8 md:p-10 shadow-[12px_12px_0px_rgba(225,6,0,0.2)] relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#e10600]/10 rounded-full blur-3xl"></div>
              <div className="flex items-start justify-between gap-4 mb-8 relative z-10">
                <div>
                  <Badge color="red">SPM</Badge>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-4 mb-3">
                    Supermod
                  </h3>
                  <p className="text-sm md:text-base font-medium text-gray-400 leading-relaxed max-w-xl">
                    Tactical Collective&apos;s Supermod is built as a more expansive, realism-focused experience with heavier content, custom mechanics, and a wider battlefield sandbox.
                  </p>
                </div>
                <div className="hidden sm:flex h-16 w-16 md:h-20 md:w-20 items-center justify-center border border-white/10 bg-white/5 p-2 shrink-0">
                  <img
                    src={SUPERMOD_LOGO_URL}
                    alt="Supermod logo"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 relative z-10">
                <div className="border-l-4 border-[#e10600] pl-4 py-2">
                  <span className="block text-2xl font-black tracking-tighter">32</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Factions</span>
                </div>
                <div className="border-l-4 border-[#e10600] pl-4 py-2">
                  <span className="block text-2xl font-black tracking-tighter">100+</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Vehicles</span>
                </div>
                <div className="border-l-4 border-[#e10600] pl-4 py-2">
                  <span className="block text-2xl font-black tracking-tighter">100+</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Weapons</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 relative z-10">
                {[
                  'Expanded factions, vehicles, optics, helicopters, and commander assets.',
                  'A complete overhaul of the ICO to make weapon handling more enjoyable.',
                  'Custom mechanics like weapon tilt, lower and raise weapon, tank zeroing, periscope systems, and dedicated special-forces gameplay.',
                ].map((item) => (
                  <div key={item} className="flex gap-4 group">
                    <div className="w-1.5 h-1.5 min-w-[6px] min-h-[6px] bg-[#e10600] mt-2"></div>
                    <p className="text-sm font-medium text-gray-300 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 relative z-10 mt-auto">
                <Link to="/leaderboard?mode=spm" className="inline-flex">
                  <Button variant="primary" size="lg">View SPM Stats</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1a1a] border-l-4 border-[#e10600] p-6 md:p-8">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 leading-relaxed">
              One Discord, one community, two different gameplay tracks. Join the server that matches your mood instead of choosing between different communities.
            </p>
          </div>
        </div>
      </section>

      {/* Who Are We Section */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-[150px] font-black opacity-5 select-none leading-none">
            LEGION
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              {/* Left Side: Image */}
              <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
                <div className="absolute inset-0 bg-[#e10600]/10 -skew-x-3 translate-x-4 translate-y-4"></div>
                <img 
                  src={WHO_ARE_WE_BANNER_URL} 
                  alt="Legion Tactical Banner" 
                  className="relative z-10 w-full h-auto border-2 border-white/10"
                  loading="lazy"
                />
              </div>

              {/* Right Side: Title + Text */}
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                  <SectionHeader 
                    title="WHO ARE WE?" 
                    subtitle="Incompetent Legion is a community-driven server operated jointly by multiple experienced clans. 
                    It is not controlled by a single group; instead, decisions about rulesets, map rotations, and server direction are shaped with input from the players themselves. 
                    The goal is to create a fair, enjoyable environment where the community has a voice and everyone contributes to the atmosphere that makes it feel like home."
                    light
                    className="mb-0"
                  />
              </div>
          </div>
        </div>
      </section>

      <DividerSVG flipped className="text-black dark:text-[#0f0f0f]" bgClassName="bg-[#f8f8f8] dark:bg-[#141414]" />

      {/* CTA Section */}
      <section className="py-24 bg-[#e10600] text-white">
          <div className="container mx-auto px-4 md:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                  <div className="text-center lg:text-left">
                      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">STAY WITH THE LEGION</h2>
                      <p className="text-xl font-bold uppercase tracking-widest opacity-80">Keep notifications on for restart news. We will not spam you.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                      <a href="https://discord.gg/2xKx4NcwRm" target="_blank" rel="noreferrer"><Button variant="black" size="xl">Join Discord</Button></a>
                       <Link to="/rules"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:!text-black">Our Rules</Button></Link>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default LandingPage;
