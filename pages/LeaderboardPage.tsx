
import React from 'react';
import { SectionHeader } from '../components/UI';
import consImg from '../src/assets/cons.webp';

const LeaderboardPage: React.FC = () => {

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
          <div className="relative border-4 border-black border-dashed p-20 flex flex-col items-center justify-center bg-gray-50 group overflow-hidden">
             <img src={consImg} alt="Under Construction" className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none" />
             <div className="w-16 h-1 bg-[#e10600] mb-6 animate-pulse"></div>
             <span className="text-sm font-black uppercase tracking-[0.5em] text-gray-400 group-hover:text-black transition-colors">
               Operational Data Stream Pending...
             </span>
             <p className="mt-4 text-[10px] font-bold text-gray-300 uppercase">Player lookup integration will be available here.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeaderboardPage;
