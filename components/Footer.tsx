
import React from 'react';
import { Link } from 'react-router-dom';
import logoRes from '../src/assets/logores.webp';

const Footer: React.FC = () => {
  const LOGO_URL = logoRes;

  return (
    <footer className="bg-black text-white pt-32 pb-12 relative overflow-hidden">
      {/* Decorative Brand Text */}
      <div className="absolute -bottom-20 left-0 text-[300px] font-black text-white/[0.03] select-none leading-none pointer-events-none uppercase">
          LEGION
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
             <div className="flex items-center gap-6 mb-10">
                <div className="h-20 w-20 bg-white p-2 border-2 border-[#e10600] shadow-[8px_8px_0px_rgba(225,6,0,0.5)] overflow-hidden">
                  <img 
                    src={LOGO_URL} 
                    alt="Incompetent Legion Logo" 
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black uppercase tracking-tighter leading-none">Incompetent</span>
                  <span className="text-3xl font-black uppercase tracking-tighter leading-none text-[#e10600]">Legion.</span>
                </div>
            </div>
            <p className="text-gray-400 text-base max-w-sm leading-relaxed font-medium">
              Tired of a one sided clan stomp? At IL - we do things different. Come and join us, and get stomped by multiple clans.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-10 pb-2 border-b-2 border-[#e10600] inline-block">Sitemap</h4>
            <ul className="space-y-6">
              <li><Link to="/" className="text-gray-500 hover:text-[#e10600] transition-colors font-black uppercase text-xs tracking-widest">Home</Link></li>
              <li><Link to="/rules" className="text-gray-500 hover:text-[#e10600] transition-colors font-black uppercase text-xs tracking-widest">Rules</Link></li>
              <li><Link to="/leaderboard" className="text-gray-500 hover:text-[#e10600] transition-colors font-black uppercase text-xs tracking-widest">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-10 pb-2 border-b-2 border-[#e10600] inline-block">Links</h4>
            <div className="flex flex-col gap-6">
                <a href="https://discord.gg/2xKx4NcwRm" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 border-2 border-white/10 flex items-center justify-center group-hover:bg-[#e10600] group-hover:border-[#e10600] transition-all">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Join Discord</span>
                </a>
                <a href="https://www.youtube.com/@incompetentlegion7437" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 border-2 border-white/10 flex items-center justify-center group-hover:bg-[#e10600] group-hover:border-[#e10600] transition-all">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">View Youtube</span>
                </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 text-center text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">
          <p>© 2026 INCOMPETENT LEGION. NO QUARTER GIVEN.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
