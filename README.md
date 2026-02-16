
# IncompetentLegion.com

The official website for the **Incompetent Legion** Squad community. Built with React, styled with Tailwind CSS, and powered by a serverless backend.

## Features

- **Landing Page** — Hero section, community info, and Discord invite links.
- **Server Rules** — Full breakdown of our server rules with a direct link to open a Discord ticket.
- **Leaderboard** — self explanitory, under construction
- **Templates** - Can be viewed at Domain/templates


## How the Backend Works

fill in the blanks

## Hosting

- **Frontend** — Static site hosted and deployed via CI/CD. SPA routing handled by a `_redirects` rule.
- **Backend** — 
- **Secrets** — API keys are stored as encrypted server-side secrets (.env)

## Project Structure

```
├── components/
│   ├── Footer.tsx            # Site footer with links and branding
│   ├── Navbar.tsx            # Responsive navbar + mobile hamburger menu
│   ├── PlayerProfile.tsx     # Player stats display component
│   └── UI.tsx                # Reusable UI primitives (Button, Card, SectionHeader)
│
├── pages/
│   ├── LandingPage.tsx       # Home page
│   ├── LeaderboardPage.tsx   # Player lookup + leaderboard
│   └── RulesPage.tsx         # Server rules + Discord ticket link
│
├── src/
│   ├── App.tsx               # App shell — routing, layout, scroll-to-top
│   ├── main.tsx              # React entry point
│   ├── index.css             # Global styles and Tailwind config
│   ├── pages/
│   │   └── NotFound.tsx      # 404 page
│   ├── assets/
│   │   ├── heroban.webp      # Hero banner image
│   │   ├── logores.webp      # Logo
│   │   └── cons.webp         # Under construction tape overlay
│
├── types.ts                  # Shared TypeScript interfaces
├── index.html                # HTML shell with meta/OG tags
├── public/
│   ├── _redirects            # SPA routing for production
│   ├── favicon.webp          # Browser tab icon
│   └── assets/
│       └── logores.webp      # OG image for social cards
│
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.*.json
```


## Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [Bun](https://bun.sh/) or npm


### 1. Install dependencies

```bash
bun install
# or
npm install
```

### 2. Environment variables

fill in the blanks


### 3. If Running locally

```bash
bun run dev
# or
npm run dev
```


## License

Private — Incompetent Legion community use only.
