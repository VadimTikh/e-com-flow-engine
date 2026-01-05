// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';

// API routes
import apiRouter from './api/routes';

export function createApp(): Application {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Mount API routes
  app.use('/api', apiRouter);

  return app;
}

export default createApp;
