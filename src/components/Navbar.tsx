
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoRes from '../assets/logores.webp';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rules', path: '/rules' },
    { name: 'Leaderboard', path: '/leaderboard' },
  ];

  const LOGO_URL = logoRes;

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md h-20 shadow-xl border-b border-gray-100' : 'bg-transparent h-28'
    }`}>
      <div className="container mx-auto px-4 md:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className={`relative transition-all duration-500 overflow-hidden ${scrolled ? 'h-10 w-10' : 'h-14 w-14'}`}>
              <img 
                src={LOGO_URL} 
                alt="Incompetent Legion Logo" 
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-black uppercase tracking-tighter leading-none transition-all duration-500 ${scrolled ? 'text-lg 3xl:text-xl 4xl:text-2xl' : 'text-2xl 3xl:text-3xl 4xl:text-4xl'}`}>
                Incompetent
              </span>
              <span className={`font-black uppercase tracking-[0.2em] leading-none text-[#e10600] transition-all duration-500 ${scrolled ? 'text-[10px] 3xl:text-xs 4xl:text-sm' : 'text-xs 3xl:text-sm 4xl:text-lg'}`}>
                Legion
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => { if (location.pathname === link.path) e.preventDefault(); }}
                className={`text-[11px] 3xl:text-sm 4xl:text-base font-black uppercase tracking-[0.2em] transition-all relative py-2 group`}
              >
                <span className={location.pathname === link.path ? 'text-[#e10600]' : 'text-black group-hover:text-[#e10600]'}>
                  {link.name}
                </span>
                <span 
                  className={`absolute -bottom-1 left-0 w-full h-[2px] bg-[#e10600] transition-transform duration-300 origin-left ${
                    location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            ))}
            
            <a href="https://discord.gg/2xKx4NcwRm" target="_blank" rel="noreferrer" className="ml-4 px-4 py-2 bg-black text-white hover:bg-[#e10600] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(225,6,0,0.3)] shadow-[4px_4px_0px_rgba(225,6,0,0.3)] flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-[1000] relative">
            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-black p-2 focus:outline-none"
            >
              <div className="w-6 flex flex-col items-end gap-1.5">
                  <span className={`h-1 bg-black transition-all ${mobileMenuOpen ? 'w-6 rotate-45 translate-y-2.5' : 'w-6'}`}></span>
                  <span className={`h-1 bg-black transition-all ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                  <span className={`h-1 bg-[#e10600] transition-all ${mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2.5' : 'w-6'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 w-screen h-screen bg-black z-[999] transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    onClick={(e) => { if (location.pathname === link.path) e.preventDefault(); setMobileMenuOpen(false); }}
                    className="text-white text-4xl font-black uppercase tracking-tighter hover:text-[#e10600] transition-colors"
                >
                    {link.name}
                </Link>
            ))}
            <div className="w-20 h-1 bg-[#e10600] my-4"></div>
            <a href="https://discord.gg/2xKx4NcwRm" target="_blank" rel="noreferrer" className="text-white/50 text-xs font-bold uppercase tracking-[0.4em]">Join Discord</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
