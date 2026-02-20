
# IncompetentLegion.com

The official website for the **Incompetent Legion** Squad community. Built with React, Tailwind CSS, and Express.

## Features

- **Landing Page** — Hero section, community info, and Discord invite links.
- **Server Rules** — Full breakdown of server rules with a direct link to open a Discord ticket.
- **Leaderboard** — Player stats from the SquadJS MySQL database. See `queries.md` for the SQL reference.
- **Templates** — UI component reference page at `/templates`.

## Project Structure

```
├── src/
│   ├── App.tsx               # Routing, layout, scroll-to-top
│   ├── main.tsx              # React entry point
│   ├── index.css             # Global styles and Tailwind config
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── UI.tsx            # Reusable UI primitives
│   ├── hooks/
│   │   └── useLeaderboard.ts # React Query hook for /api/leaderboard
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LeaderboardPage.tsx
│   │   ├── RulesPage.tsx
│   │   ├── TemplatesPage.tsx
│   │   └── NotFound.tsx
│   └── assets/
│
├── server.js                 # Express backend + API routes
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.*.json
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

| Variable | Default | Optional | Description |
|----------|---------|----------|-------------|
| `DATABASE_URL` | `mysql://root:test@127.0.0.1:3306/squadjs_db` | Yes | MySQL connection URI |
| `PORT` | `7000` | Yes | Express server port |

### 3. Run the server

```bash
node server.js
```

With a custom database:

```bash
DATABASE_URL=mysql://user:password@host:3306/squadjs_db node server.js
```

## License

Private — Incompetent Legion community use only.
