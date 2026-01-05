# E-com-Flow-Engine

E-commerce workflow automation engine with queue-based order processing and API integrations.

## Tech Stack

- **Runtime:** Node.js 20, TypeScript
- **Framework:** Express 5
- **Databases:** MongoDB, PostgreSQL, Redis
- **Queue:** BullMQ
- **Integrations:** Nova Poshta, SalesDrive, OpenAI

## Project Structure
```
src/
├── api/                   # HTTP layer
│   ├── routes/            # Express routers
│   ├── controllers/       # Request handlers
│   └── middlewares/       # Auth, validation, error handling
├── services/              # Business logic
├── providers/             # External API clients (Nova Poshta, SalesDrive, OpenAI)
├── models/                # Data schemas
│   ├── mongodb/           # Mongoose models
│   └── postgres/          # Prisma/TypeORM entities
├── queue/                 # Background jobs (BullMQ)
│   ├── workers/           # Queue processors
│   └── jobs/              # Job definitions
├── config/                # Environment config
├── shared/                # Types, utils, logger
├── app.ts                 # Express app setup
└── server.ts              # Entry point
```

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local dev without Docker)

### Run with Docker
```bash
cp .env.example .env
docker compose up
```

### Run locally
```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm start` | Run production build |
| `npm test` | Run tests |

## Environment Variables

See `.env.example` for required configuration.

## License

ISC