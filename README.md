# E-com-Flow-Engine

A TypeScript/Express starter project for building an e-commerce workflow automation engine. Currently implements the foundational structure with placeholder services ready for integration with Nova Poshta, SalesDrive CRM, and OpenAI.

## Current Status

**Implemented:**
- Express 5 REST API with TypeScript
- Docker Compose setup with MongoDB, PostgreSQL, and Redis
- Project structure with organized layers (API, services, providers, models)
- Provider client stubs for Nova Poshta, SalesDrive, and OpenAI
- Basic health check endpoint (`/health`)
- Development environment with hot reload (ts-node-dev)

**Not Yet Implemented:**
- Queue system (BullMQ workers and jobs)
- Database models and schemas (MongoDB/PostgreSQL)
- API routes for orders, scraping, AI analysis
- Actual third-party API integrations
- Authentication and validation middleware
- Business logic in services (currently placeholder methods)

## Tech Stack

- **Runtime:** Node.js 20+
- **Language:** TypeScript
- **Framework:** Express 5
- **Databases:** MongoDB 7, PostgreSQL 16, Redis 7 (configured, not yet used)
- **Dependencies:** axios, cors, helmet, winston, zod

## Project Structure
```
src/
├── api/
│   ├── routes/            # Express routers (basic setup)
│   ├── controllers/       # Request handlers (empty, ready for implementation)
│   └── middlewares/       # Auth, validation, error handling (empty)
├── services/              # Business logic (stub implementations)
│   ├── OrderService.ts    # Order sync placeholder
│   ├── AIService.ts       # AI analysis placeholder
│   └── ScraperService.ts  # Scraping placeholder
├── providers/             # External API client stubs
│   ├── NovaPoshta.ts      # Shipping tracking client stub
│   ├── SalesDrive.ts      # CRM client stub
│   └── OpenAI.ts          # AI completion client stub
├── models/                # Data schemas (empty, ready for Mongoose/Prisma)
│   ├── mongodb/
│   └── postgres/
├── queue/                 # Background jobs (empty, ready for BullMQ)
│   ├── workers/
│   └── jobs/
├── config/                # Environment configuration
├── shared/                # Types, utils, logger
├── app.ts                 # Express app setup
└── server.ts              # Application entry point
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

## Planned Features

This project is intended to become a full-featured e-commerce automation system with:

- **Order Processing:** Queue-based background jobs using BullMQ for async order handling
- **CRM Integration:** Sync orders and customer data with SalesDrive CRM
- **Shipping Integration:** Automated tracking and status updates via Nova Poshta API
- **AI-Powered Analysis:** OpenAI integration for data analysis and insights
- **Web Scraping:** Service for crawling and extracting e-commerce data
- **Multi-Database Support:** Hybrid storage using MongoDB for documents and PostgreSQL for relational data
- **API Authentication:** Middleware for secure API access
- **Validation & Error Handling:** Request validation with Zod and comprehensive error handling

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Application
NODE_ENV=development
PORT=3000

# Databases (configured in docker-compose, not yet used by app)
MONGO_URI=mongodb://mongo:27017/app
POSTGRES_URL=postgresql://app:app@postgres:5432/app
REDIS_URL=redis://redis:6379

# External API Keys (required when implementing integrations)
NOVA_POSHTA_API_KEY=       # Nova Poshta shipment tracking
SALESDRIVE_BASE_URL=       # SalesDrive CRM base URL
SALESDRIVE_API_KEY=        # SalesDrive CRM API key
OPENAI_API_KEY=            # OpenAI API key for AI features
```

## License

ISC