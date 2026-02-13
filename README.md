
# IncompetentLegion.com

The official website for the **Incompetent Legion** Squad community. Built with React, styled with Tailwind CSS, and powered by a serverless backend.

## Features

- **Landing Page** — Hero section, community info, and Discord invite links.
- **Server Rules** — Full breakdown of our server rules with a direct link to open a Discord ticket.
- **Player Lookup** — Search any player by SteamID to view their season & all-time stats, top weapons, and ribbons. Powered by the [MySquadStats](https://mysquadstats.com) API.
- **Leaderboard** — Top Seeders section (under construction), with player stat retrieval fully operational.
- **Mobile-First Navigation** — Responsive navbar with a full-screen hamburger menu overlay.

## How the Backend Works

The frontend never talks to the MySquadStats API directly — that would expose our API key.

Instead, all requests go through a **serverless edge function** (`mssproxy`). The flow looks like this:

```
Browser  →  Edge Function (mssproxy)  →  MySquadStats API
                  ↑
          API key stored as a
          server-side secret
```

The edge function reads the `MSS_ACCESS_TOKEN` secret, builds the appropriate MySquadStats API URL based on the requested endpoint, fetches the data, and returns it to the browser.

### Supported Endpoints (via proxy)

| Endpoint              | Description                        |
|-----------------------|------------------------------------|
| `players`             | Search for a player by SteamID     |
| `playerWeapons`       | Weapon stats for a player          |
| `playerRibbons`       | Ribbons/honors for a player        |
| `seasonLeaderboards`  | Current season leaderboard data    |
| `allTimeLeaderboards` | All-time leaderboard data          |

## Hosting

- **Frontend** — Static site hosted and deployed via CI/CD. SPA routing handled by a `_redirects` rule.
- **Backend** — Serverless edge functions. No traditional server to manage — functions spin up on demand and scale automatically.
- **Secrets** — API keys are stored as encrypted server-side secrets, never exposed to the client.

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
├── services/
│   └── api.ts                # MySquadStats API client (calls edge function proxy)
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
│   └── integrations/
│       └── supabase/         # Auto-generated client + types (do not edit)
│
├── supabase/
│   └── functions/
│       └── mssproxy/
│           └── index.ts      # Edge function — proxies MySquadStats API
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

The app needs these environment variables (Casual has these -"joinB3"):

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Backend URL for edge function calls |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public API key for backend auth |

The edge function also requires:

| Secret | Description |
|--------|-------------|
| `MSS_ACCESS_TOKEN` | MySquadStats API key (server-side only, never exposed to browser) |

### 3. If Running locally

```bash
bun run dev
# or
npm run dev
```


## License

Private — Incompetent Legion community use only.
