
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, SectionHeader, DividerSVG, StatBox, Badge } from '../components/UI';
import logoRes from '../assets/logores.webp';
import heroBan from '../assets/heroban.webp';

const LandingPage: React.FC = () => {
  const HERO_IMAGE_URL = logoRes;
  const WHO_ARE_WE_BANNER_URL = heroBan;

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 md:pt-28 pb-12 md:pb-0">
        <div className="absolute inset-0 bg-grid opacity-[0.05]"></div>
        <div className="absolute inset-0 topo-pattern"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full bg-[#e10600]/5 -skew-x-12 hidden lg:block"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 border-[60px] border-black/5 rounded-full hidden lg:block"></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 3xl:max-w-[1920px] 4xl:max-w-[1920px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 3xl:gap-8 4xl:gap-8">
            <div className="flex-1 text-center lg:text-left">
                
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[120px] 3xl:text-[140px] 4xl:text-[160px] font-black uppercase tracking-tighter leading-[0.8] mb-6 md:mb-8 text-black">
                  <br/>
                  <span className="text-black" style={{ WebkitTextStroke: '2px rgba(0,0,0,0.15)' }}>INCOMPETENT</span><br/>
                  <span className="text-[#e10600]">LEGION</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-2xl 3xl:text-3xl 4xl:text-4xl font-medium text-gray-500 mb-8 md:mb-12 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Tired of a one sided clan stomp? At IL - we do things different.
                  Come and join us, and get stomped by multiple clans.
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
                  <a href="https://discord.gg/2xKx4NcwRm" target="_blank" rel="noreferrer"><Button size="lg" variant="primary">Discord</Button></a>
                  <a href="https://www.youtube.com/@incompetentlegion7437" target="_blank" rel="noreferrer"><Button size="lg" variant="outline">Youtube</Button></a>
                </div>
            </div>

            <div className="flex-1 relative hidden lg:block 3xl:max-w-[500px] 4xl:max-w-[500px]">
                <div className="relative z-20 shadow-2xl transition-all duration-700 bg-white p-6">
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

      <DividerSVG color="#000" />

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

      <DividerSVG flipped color="#000" bg="#f8f8f8" />

      {/* Featured Video / Welcome Section */}
      <section className="py-32 bg-[#f8f8f8]">
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
