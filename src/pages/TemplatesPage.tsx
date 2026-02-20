
// =========================================================================
// TEMPLATES PAGE
// Hidden reference page at /templates for copy-pasting reusable UI patterns.
// Not linked in navigation -- access directly via URL.
// Each section below is a self-contained, copy-pasteable block.
// =========================================================================

import React from 'react';
import { Card, SectionHeader, DividerSVG, Badge, StatBox, Button } from '../components/UI';

const TemplatesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="container mx-auto px-4 md:px-8 pt-40">

        {/* Page Header */}
        <SectionHeader
          title="Component Templates"
          subtitle="Copy-paste reference for all reusable UI patterns used across the site. This page is hidden from navigation."
          accent="Internal"
        />

        {/* =================================================================
            TEMPLATE 1: Section Header
            Usage: Top of every content section. Supports light/dark bg,
            centered alignment, and custom accent label.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Section Header
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Component: SectionHeader from components/UI.tsx
          </p>

          {/* Default (left-aligned, dark text) */}
          <div className="mb-8 p-8 border-2 border-dashed border-gray-200">
            <SectionHeader
              title="Example Title Here"
              subtitle="A short description of what this section contains."
              accent="Label"
            />
          </div>

          {/* Centered variant */}
          <div className="mb-8 p-8 border-2 border-dashed border-gray-200">
            <SectionHeader
              title="Centered Variant"
              subtitle="Pass centered={true} to center-align the header block."
              accent="Centered"
              centered
            />
          </div>

          {/* Light variant (for dark backgrounds) */}
          <div className="p-8 bg-black">
            <SectionHeader
              title="Light Variant"
              subtitle="Pass light={true} when placed on a dark background."
              accent="On Dark BG"
              light
              className="mb-0"
            />
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 2: Content Card
            Usage: Any bordered content block with optional title tab.
            Import: Card from components/UI.tsx
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Content Card
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Component: Card from components/UI.tsx
          </p>

          {/* Card with title tab */}
          <div className="mb-8">
            <Card title="Card Title">
              <p className="text-sm font-medium text-gray-600 leading-relaxed">
                This is a standard content card with a floating title tab.
                Use it for grouping related content like rules, stats, or info blocks.
              </p>
            </Card>
          </div>

          {/* Card without title */}
          <Card>
            <p className="text-sm font-medium text-gray-600 leading-relaxed">
              Card without a title tab. Good for search forms or simple content wrappers.
            </p>
          </Card>
        </section>

        {/* =================================================================
            TEMPLATE 3: Lookup / Search Box
            Usage: Player search, any text input with action button.
            Combines Card wrapper with input + Button.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Lookup / Search Box
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Card + input + Button
          </p>

          <Card className="mb-4">
            {/* Search form -- replace onSubmit handler with your logic */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col md:flex-row gap-6"
            >
              <div className="flex-grow relative">
                {/* Text input with uppercase styling */}
                <input
                  type="text"
                  placeholder="ENTER SEARCH TERM..."
                  className="w-full px-8 py-5 border-2 border-black focus:outline-none focus:border-[#e10600] font-black text-sm placeholder:text-gray-300 uppercase tracking-widest"
                />
                {/* Optional: loading spinner (toggle visibility as needed) */}
                {/*
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 border-2 border-[#e10600] border-t-transparent rounded-full animate-spin"></div>
                </div>
                */}
              </div>
              <Button type="submit" variant="black" size="lg">
                Retrieve Data
              </Button>
            </form>
            {/* Optional: error message */}
            {/*
            <p className="mt-4 text-xs font-black text-[#e10600] uppercase tracking-widest">
              Error message goes here.
            </p>
            */}
          </Card>
        </section>

        {/* =================================================================
            TEMPLATE 4: Statistics Display (Stat Rows)
            Usage: Key-value stat lines with optional rank indicator.
            Used inside Card wrappers for player profiles, leaderboards, etc.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Statistics Display (Stat Rows)
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Inline stat rows inside a Card
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Standard stat rows */}
            <Card title="Combat Stats">
              <div className="mt-2">
                {/* Each row: label on left, value + optional rank on right */}
                {[
                  { label: 'Wounds', value: '1,204', rank: 42 },
                  { label: 'Kills', value: '983', rank: 58 },
                  { label: 'Deaths', value: '412', rank: 120 },
                  { label: 'K/D Ratio', value: '2.39', rank: 35 },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {stat.label}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm">{stat.value}</span>
                      {stat.rank > 0 && (
                        <span className="text-[9px] font-bold text-gray-400">
                          (Ranked: {stat.rank})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Highlight rows (colored value) */}
            <Card title="Highlights">
              <div className="mt-2">
                {[
                  { label: 'Favorite Weapon', name: 'AK-74', detail: '(312 Wounds)' },
                  { label: 'Top Victim', name: 'SomePlayer', detail: '24 Times' },
                  { label: 'Top Nemesis', name: 'AnotherPlayer', detail: '18 Times' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {/* Name in accent color */}
                      <span className="font-black text-sm text-[#e10600]">{item.name}</span>
                      <span className="text-[9px] font-bold text-gray-400">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 5: StatBox (Inline Stat with Border)
            Usage: Quick numeric stats in a row. Import from components/UI.tsx.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            StatBox (Inline)
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Component: StatBox from components/UI.tsx
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatBox label="Total Score" value="12,500" />
            <StatBox label="Kills" value="983" />
            <StatBox label="K/D Ratio" value="2.39" suffix="x" />
            <StatBox label="Hours Played" value="1,204" suffix="h" />
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 6: Profile Header (Dark Box)
            Usage: Player identity card, user profile, or featured content.
            Black background with red bottom border and overlaid content.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Profile Header (Dark Box)
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Black card with accent border, badge, and stat grid
          </p>

          <div className="bg-black text-white p-10 border-b-8 border-[#e10600] relative overflow-hidden">
            {/* Background decorative icon (optional) */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>

            <Badge color="red">Level 42</Badge>
            <h3 className="text-4xl font-black uppercase tracking-tighter mt-4 mb-2">
              Player Name
            </h3>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">
              STEAM_ID: 76561198000000001
            </p>

            {/* Stat grid inside the header */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#e10600]">12,500</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Total Score</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">42</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Level</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-gray-400 truncate">Server Name Here</span>
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Last Server</span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 7: Rule List Box
            Usage: Bulleted rule lists inside a Card. Supports red or black dots.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Rule List Box
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Card with titled sub-sections and bullet lists
          </p>

          <Card title="Section: Rules Example">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left column: red dots */}
              <div>
                <h4 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                  <span className="text-[#e10600]">/</span> Category Name
                </h4>
                <ul className="space-y-4">
                  {[
                    'First rule or guideline goes here',
                    'Second rule with more detail if needed',
                    'Third rule to round out the list',
                  ].map((rule, i) => (
                    <li key={i} className="flex gap-4 group">
                      {/* Red dot indicator */}
                      <div className="w-1.5 h-1.5 min-w-[6px] min-h-[6px] bg-[#e10600] mt-2 group-hover:scale-150 transition-transform"></div>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed group-hover:text-black transition-colors">
                        {rule}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column: black dots */}
              <div>
                <h4 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                  <span className="text-[#e10600]">/</span> Another Category
                </h4>
                <ul className="space-y-4">
                  {[
                    'Alternate rule with black dot style',
                    'Another guideline for this category',
                  ].map((rule, i) => (
                    <li key={i} className="flex gap-4 group">
                      {/* Black dot indicator */}
                      <div className="w-1.5 h-1.5 min-w-[6px] min-h-[6px] bg-black mt-2 group-hover:scale-150 transition-transform"></div>
                      <p className="text-sm font-medium text-gray-600 leading-relaxed group-hover:text-black transition-colors">
                        {rule}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* =================================================================
            TEMPLATE 8: Info / Callout Box
            Usage: Important notices, admin discretion panels, support CTAs.
            Two variants: dark (black bg) and light (gray bg with border).
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Info / Callout Boxes
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Standalone boxes for notices, warnings, and CTAs
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dark callout box */}
            <div className="bg-black text-white p-12 border-b-8 border-[#e10600]">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">
                Dark Callout Title
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                Descriptive text for an important notice or disclaimer.
                Supports multiple lines of content.
              </p>
              {/* Optional: key-value rows */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest">Label</span>
                  <span className="text-[10px] font-bold text-[#e10600]">Value</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest">Another Label</span>
                  <span className="text-[10px] font-bold text-[#e10600]">Another Value</span>
                </div>
              </div>
            </div>

            {/* Light callout box with CTA */}
            <div className="p-12 border-2 border-black bg-[#f8f8f8] relative overflow-hidden">
              {/* Decorative background icon */}
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">
                Light Callout Title
              </h3>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8 leading-loose">
                Secondary text or call to action description goes here.
              </p>
              {/* CTA button (full width) */}
              <a
                href="#"
                className="block w-full py-4 bg-black text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-[#e10600] transition-colors text-center"
              >
                Action Button
              </a>
            </div>
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 9: Important Notice (Inline)
            Usage: Sidebar-style callout with left border accent and badge.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Important Notice (Inline)
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Left-bordered box with Badge
          </p>

          <div className="bg-gray-50 p-6 border-l-4 border-black">
            <Badge color="black">IMPORTANT</Badge>
            <p className="mt-4 text-xs font-bold text-gray-500 leading-relaxed uppercase tracking-widest">
              This is an inline notice block. Use it for important caveats,
              disclaimers, or context that sits alongside other content.
            </p>
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 10: Weapon / Item List
            Usage: Ranked list of items with dual stat columns.
            Used for weapons, equipment, or any name + two-value display.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Weapon / Item List
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Card with rows showing name + two numeric columns
          </p>

          <Card title="Top Weapons">
            <div className="space-y-0">
              {[
                { name: 'AK-74', stat1: 150, stat1Label: 'Wounds', stat2: 5000, stat2Label: 'Dmg' },
                { name: 'M4A1', stat1: 120, stat1Label: 'Wounds', stat2: 4200, stat2Label: 'Dmg' },
                { name: 'SVD', stat1: 85, stat1Label: 'Wounds', stat2: 3800, stat2Label: 'Dmg' },
              ].map((w, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 -mx-2 transition-colors">
                  {/* Item name */}
                  <span className="text-xs font-black uppercase tracking-tight">{w.name}</span>
                  <div className="flex gap-6">
                    {/* First stat */}
                    <div className="text-right">
                      <span className="text-sm font-black">{w.stat1}</span>
                      <span className="text-[8px] font-bold text-gray-400 uppercase ml-1">{w.stat1Label}</span>
                    </div>
                    {/* Second stat (accent color) */}
                    <div className="text-right">
                      <span className="text-sm font-black text-[#e10600]">{w.stat2.toLocaleString()}</span>
                      <span className="text-[8px] font-bold text-gray-400 uppercase ml-1">{w.stat2Label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* =================================================================
            TEMPLATE 11: Ribbon / Award Grid
            Usage: Grid of small award cards with icon, name, and count.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Ribbon / Award Grid
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Card with 2-column grid of icon + text items
          </p>

          <Card title="Honors and Ribbons">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Iron Sights Mastery', count: 3 },
                { name: 'Medic Excellence', count: 1 },
                { name: 'Squad Wipe', count: 5 },
                { name: 'Logistics Hero', count: 2 },
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 border border-gray-100 hover:border-[#e10600] transition-colors">
                  {/* Icon placeholder */}
                  <div className="w-8 h-8 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#e10600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase leading-tight block">{r.name}</span>
                    <span className="text-[9px] text-gray-400">x{r.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* =================================================================
            TEMPLATE 12: Toggle / Tab Bar
            Usage: View switcher between two or more modes.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Toggle / Tab Bar
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Two-button toggle with active state highlight
          </p>

          <div className="flex border-2 border-black">
            {/* Active tab */}
            <button className="flex-1 py-4 text-xs font-black uppercase tracking-widest bg-[#e10600] text-white transition-all">
              Option A
            </button>
            {/* Inactive tab */}
            <button className="flex-1 py-4 text-xs font-black uppercase tracking-widest bg-white text-black hover:bg-gray-50 transition-all">
              Option B
            </button>
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 13: Placeholder / Under Construction Box
            Usage: Sections awaiting data or features not yet implemented.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Placeholder / Under Construction
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Dashed border box with pulsing indicator
          </p>

          <div className="relative border-4 border-black border-dashed p-20 flex flex-col items-center justify-center bg-gray-50">
            <div className="w-16 h-1 bg-[#e10600] mb-6 animate-pulse"></div>
            <span className="text-sm font-black uppercase tracking-[0.5em] text-gray-400">
              Feature Coming Soon...
            </span>
            <p className="mt-4 text-[10px] font-bold text-gray-300 uppercase">
              Description of what will be added here.
            </p>
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 14: CTA Banner (Full Width)
            Usage: Call-to-action strip, typically between sections.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            CTA Banner
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Pattern: Full-width colored banner with heading and buttons
          </p>

          <div className="py-16 px-8 bg-[#e10600] text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                  Call To Action
                </h2>
                <p className="text-base font-bold uppercase tracking-widest opacity-80">
                  Supporting text for the call to action.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="black" size="lg">Primary Action</Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:!text-black">
                  Secondary Action
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 15: Divider
            Usage: Angled SVG divider between sections. Supports flip and
            custom colors for seamless section transitions.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Section Divider
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Component: DividerSVG from components/UI.tsx
          </p>

          {/* Standard divider (dark wedge) */}
          <div className="mb-4 border border-dashed border-gray-200">
            <DividerSVG color="#000" />
          </div>

          {/* Flipped divider with background color */}
          <div className="border border-dashed border-gray-200">
            <DividerSVG flipped color="#000" bg="#f8f8f8" />
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 16: Badge
            Usage: Small label tags in red, black, or gray.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Badges
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Component: Badge from components/UI.tsx
          </p>

          <div className="flex flex-wrap gap-4">
            <Badge color="red">Red Badge</Badge>
            <Badge color="black">Black Badge</Badge>
            <Badge color="gray">Gray Badge</Badge>
          </div>
        </section>

        {/* =================================================================
            TEMPLATE 17: Buttons
            Usage: All button variants and sizes.
        ================================================================= */}
        <section className="mb-24">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-[#e10600] pb-2 inline-block">
            Buttons
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            Component: Button from components/UI.tsx
          </p>

          <div className="space-y-6">
            {/* Variants */}
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="black">Black</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            {/* Sizes */}
            <div className="flex flex-wrap items-end gap-4">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" size="xl">Extra Large</Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TemplatesPage;
