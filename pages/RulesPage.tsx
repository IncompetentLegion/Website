import React from 'react';
import { Card, SectionHeader, DividerSVG, Badge } from '../components/UI';

const RulesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="pt-40 pb-32">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader 
            title="Operational Directives" 
            subtitle="To maintain a fun, but fair experience for all, we expect players to abide by the following rules:" 
            accent="Rules"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            {/* Core Rules */}
            <div className="lg:col-span-2">
                <Card title="Section 01: Core Conduct">
                  <div className="space-y-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-xl 3xl:text-2xl 4xl:text-3xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                                <span className="text-[#e10600]">/</span> General Behavior
                            </h4>
                            <ul className="space-y-4">
                                {[
                                  "Don't be a dick",
                                  "Cheating, exploiting, glitch and bug abuse is forbidden",
                                  "Racism and other abusive language is not allowed",
                                  "Ghosting or leaking intel to the enemy team is strictly forbidden."
                                ].map((rule, i) => (
                                    <li key={i} className="flex gap-4 group">
                                        <div className="w-1.5 h-1.5 bg-[#e10600] mt-2 group-hover:scale-150 transition-transform"></div>
                                        <p className="text-sm 3xl:text-base 4xl:text-lg font-medium text-gray-600 leading-relaxed group-hover:text-black transition-colors">{rule}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xl 3xl:text-2xl 4xl:text-3xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                                <span className="text-[#e10600]">/</span> Tactical Communication
                            </h4>
                            <ul className="space-y-4">
                                {[
                                  "Squad Leaders MUST have a working microphone.",
                                  "English only in Command and Global chat channels.",
                                  "No mic spamming during staging phase or end of round"
                                ].map((rule, i) => (
                                    <li key={i} className="flex gap-4 group">
                                        <div className="w-1.5 h-1.5 bg-black mt-2 group-hover:scale-150 transition-transform"></div>
                                        <p className="text-sm 3xl:text-base 4xl:text-lg font-medium text-gray-600 leading-relaxed group-hover:text-black transition-colors">{rule}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                  </div>
                </Card>

                <div className="mt-8">
                    <Card title="Section 02: Assets & Vehicles">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h4 className="text-xl 3xl:text-2xl 4xl:text-3xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                                    <span className="text-[#e10600]">/</span> Claiming Rights
                                </h4>
                                <ul className="space-y-4">
                                    {[
                                      "Vehicles are claimed at first come first serve basis",
                                      "Vehicles on spawn timers may be claimed in chat and you have to be in main on respawn to claim it",
                                      "Do not one man vehicles that require a crewman kit",
                                      "One squad may only claim one vehicle requiring a crewman kit at the start of the match",
                                      "LOGI squads can only claim logis after staging phase, inf squads have the priority",
                                      "Mechanized infantry squads are allowed"
                                    ].map((rule, i) => (
                                        <li key={i} className="flex gap-4 group">
                                            <div className="w-1.5 h-1.5 bg-[#e10600] mt-2"></div>
                                            <p className="text-sm 3xl:text-base 4xl:text-lg font-medium text-gray-600 leading-relaxed group-hover:text-black transition-colors">{rule}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-6 border-l-4 border-black">
                                <Badge color="black">IMPORTANT</Badge>
                                <p className="mt-4 text-xs 3xl:text-sm 4xl:text-base font-bold text-gray-500 leading-relaxed uppercase tracking-widest">
                                    Main camping is regulated by common sense. You must allow enemies to leave their protection zone. Admins use discretion based on current layer geometry.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Admin/Support Info */}
            <div className="space-y-8">
                <div className="bg-black text-white p-12 border-b-8 border-[#e10600]">
                    <h3 className="text-3xl 3xl:text-4xl 4xl:text-5xl font-black uppercase tracking-tighter mb-6">Staff Discretion</h3>
                    <p className="text-gray-400 text-sm 3xl:text-base 4xl:text-lg leading-relaxed mb-8 font-medium">
                        Admins have the final say. Rules are guidelines to ensure gameplay quality. If you are asked to change your behavior by a staff member, please comply.
                    </p>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="text-[10px] 3xl:text-xs 4xl:text-sm font-black uppercase tracking-widest">Kick</span>
                            <span className="text-[10px] 3xl:text-xs 4xl:text-sm font-bold text-[#e10600]">Final Warning</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-white/10">
                            <span className="text-[10px] 3xl:text-xs 4xl:text-sm font-black uppercase tracking-widest">Ban</span>
                            <span className="text-[10px] 3xl:text-xs 4xl:text-sm font-bold text-[#e10600]">Rule Violation</span>
                        </div>
                    </div>
                </div>

                <div className="p-12 border-2 border-black bg-[#f8f8f8] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl 3xl:text-3xl 4xl:text-4xl font-black uppercase tracking-tighter mb-4">Need Support?</h3>
                    <p className="text-gray-500 text-xs 3xl:text-sm 4xl:text-base font-bold uppercase tracking-widest mb-8 leading-loose">
                        Found a rule breaker? Witnessed asset wasting? Open a ticket on our Discord.
                    </p>
                    <a href="https://discord.com/channels/1470133728989938020/1470870357505474610" target="_blank" rel="noreferrer" className="block w-full py-4 bg-black text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-[#e10600] transition-colors text-center">
                        Launch Discord Ticket
                    </a>
                </div>
            </div>
          </div>
        </div>
      </section>
      
      <DividerSVG color="#000" />
      
      <section className="py-24 bg-black text-white text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-5xl 3xl:text-6xl 4xl:text-7xl font-black uppercase tracking-tighter mb-6">STAND FIRM.</h2>
          <p className="text-gray-400 mb-12 max-w-xl 3xl:max-w-2xl mx-auto font-medium 3xl:text-lg">Our rules are enforced to protect the experience of every player in the Legion. See you on the front lines.</p>
        </div>
      </section>
    </div>
  );
};

export default RulesPage;