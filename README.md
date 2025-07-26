# 파운드마켓 (FoundMarket) - Korean M&A Asset Trading Platform

Production-level Korean M&A asset trading platform inspired by Flippa and KREAM.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Monorepo**: Turborepo
- **Real-time**: Socket.io
- **i18n**: i18next (Korean default, English fallback)

## 📁 Project Structure

```
appweb/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Express.js backend
├── packages/
│   ├── ui/           # Shared UI components
│   └── database/     # Prisma database schema
├── turbo.json        # Turborepo config
└── package.json      # Root package.json
```

## 🛠️ Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the values
3. Install dependencies: `npm install`
4. Generate Prisma client: `npm run db:generate -w @appweb/database`
5. Push database schema: `npm run db:push -w @appweb/database`
6. Start development: `npm run dev`

## 📝 Available Scripts

- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps
- `npm run lint` - Lint all apps
- `npm run format` - Format code with Prettier

Project structure initialized and ready for page scaffolding.