// src/shared/logger.ts
import winston from 'winston';

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp, service, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${service ?? 'app'}] ${level}: ${message}${metaStr}`;
});

// Log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Determine log level based on environment
const getLogLevel = (): string => {
  const env = process.env.NODE_ENV ?? 'development';
  return env === 'development' ? 'debug' : 'info';
};

// Base logger configuration
const logger = winston.createLogger({
  level: getLogLevel(),
  levels,
  format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      json()
  ),
  defaultMeta: { service: 'app' },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: combine(
          colorize({ all: true }),
          timestamp({ format: 'HH:mm:ss' }),
          consoleFormat
      ),
    }),
  ],
});

// Add file transports in production
if (process.env.NODE_ENV === 'production') {
  logger.add(
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      })
  );
  logger.add(
      new winston.transports.File({
        filename: 'logs/combined.log',
        maxsize: 5242880,
        maxFiles: 5,
      })
  );
}

// Create child logger for specific service
/*
USAGE EXAMPLE:
import { createLogger } from '../shared/logger';
const log = createLogger('inventory');
export async function updateStock(sku: string, qty: number) {
  log.debug('Updating stock', { sku, qty });
  // ... logic
  log.info('Stock updated successfully', { sku, newQty: qty });
}
 */
export const createLogger = (service: string): winston.Logger => {
  return logger.child({ service });
};

export default logger;