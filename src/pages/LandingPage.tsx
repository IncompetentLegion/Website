
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, SectionHeader, DividerSVG, Badge } from '../components/UI';
import logoRes from '../assets/logores.webp';
import heroBan from '../assets/heroban.webp';
import squadOfficialLogo from '../assets/squad-official-logo.webp';
import supermodLogoSmall from '../assets/supermod-logo-small.webp';

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
                  Tired of a one sided clan stomp? At IL - we do things different.
                  Come and join us, and get stomped by multiple clans.
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
                  <a href="https://discord.gg/2xKx4NcwRm" target="_blank" rel="noreferrer"><Button size="lg" variant="primary">Discord</Button></a>
                  <a href="https://www.youtube.com/@incompetentlegion7437" target="_blank" rel="noreferrer"><Button size="lg" variant="outline">Youtube</Button></a>
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

      {/* Featured Video / Welcome Section */}
      <section className="py-32 bg-[#f8f8f8] dark:bg-[#141414]">
        <div className="container mx-auto px-4 md:px-8">
            <div className="mb-16">
                <SectionHeader 
                    title="Welcome to IL" 
                    subtitle="Experience the absolute peak of tactical chaos and community engagement. This is how the Legion operates." 
                />
            </div>

            <div className="max-w-5xl mx-auto">
                <div className="relative aspect-video bg-black overflow-hidden border-b-8 border-[#e10600] shadow-2xl">
                    <iframe 
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/yoFu6TRdnzc?rel=0&enablejsapi=1" 
                        title="Incompetent Legion Tactical Operations" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#e10600] text-white">
          <div className="container mx-auto px-4 md:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                  <div className="text-center lg:text-left">
                      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">READY TO DEPLOY?</h2>
                      <p className="text-xl font-bold uppercase tracking-widest opacity-80">Join the people. Join the Legion.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                      <a href="https://discord.gg/2xKx4NcwRm" target="_blank" rel="noreferrer"><Button variant="black" size="xl">Join Discord Server</Button></a>
                       <Link to="/rules"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:!text-black">Our Rules</Button></Link>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default LandingPage;
