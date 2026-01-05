// src/config/env.ts
export interface AppEnv {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI?: string;
  POSTGRES_URL?: string;
  REDIS_URL?: string;
  NOVA_POSHTA_API_KEY?: string;
  SALESDRIVE_BASE_URL?: string;
  SALESDRIVE_API_KEY?: string;
  OPENAI_API_KEY?: string;
}

export const env: AppEnv = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  MONGO_URI: process.env.MONGO_URI,
  POSTGRES_URL: process.env.POSTGRES_URL,
  REDIS_URL: process.env.REDIS_URL,
  NOVA_POSHTA_API_KEY: process.env.NOVA_POSHTA_API_KEY,
  SALESDRIVE_BASE_URL: process.env.SALESDRIVE_BASE_URL,
  SALESDRIVE_API_KEY: process.env.SALESDRIVE_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
