/**
 * Environment variable validation
 * Ensures all required environment variables are set
 */

interface EnvConfig {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
  RESEND_API_KEY: string;
  TO_EMAIL: string;
  NEXT_PUBLIC_BASE_URL: string;
}

export function validateEnv(): { valid: boolean; missing: string[] } {
  const required: (keyof EnvConfig)[] = [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'RESEND_API_KEY',
    'TO_EMAIL',
    'NEXT_PUBLIC_BASE_URL',
  ];

  const missing: string[] = [];

  required.forEach((key) => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Get environment variable with validation
 */
export function getEnv(key: keyof EnvConfig): string {
  const value = process.env[key];
  
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
}

