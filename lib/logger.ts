/**
 * Simple logging utility
 * In production, consider using a proper logging service (Sentry, LogRocket, etc.)
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
  ip?: string;
  userAgent?: string;
}

function formatLog(entry: LogEntry): string {
  const { level, message, timestamp, data, ip, userAgent } = entry;
  let log = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  if (data) {
    log += ` | Data: ${JSON.stringify(data)}`;
  }
  
  if (ip) {
    log += ` | IP: ${ip}`;
  }
  
  if (userAgent) {
    log += ` | UA: ${userAgent}`;
  }
  
  return log;
}

export const logger = {
  info: (message: string, data?: any) => {
    const entry: LogEntry = {
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      data,
    };
    console.log(formatLog(entry));
  },

  warn: (message: string, data?: any) => {
    const entry: LogEntry = {
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      data,
    };
    console.warn(formatLog(entry));
  },

  error: (message: string, error?: any, data?: any) => {
    const entry: LogEntry = {
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      data: {
        ...data,
        error: error?.message || error,
        stack: error?.stack,
      },
    };
    console.error(formatLog(entry));
  },

  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      const entry: LogEntry = {
        level: 'debug',
        message,
        timestamp: new Date().toISOString(),
        data,
      };
      console.debug(formatLog(entry));
    }
  },
};

