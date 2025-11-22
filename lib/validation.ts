/**
 * Input validation and sanitization utilities
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Check length
  if (email.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }

  return { valid: true };
}

/**
 * Validate URL format
 */
export function validateURL(url: string): ValidationResult {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'URL is required' };
  }

  let urlToCheck = url.trim();
  
  // Add protocol if missing
  if (!urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
    urlToCheck = `https://${urlToCheck}`;
  }

  try {
    const urlObj = new URL(urlToCheck);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { valid: false, error: 'URL must use http or https protocol' };
    }

    // Check for valid domain
    if (!urlObj.hostname || urlObj.hostname.length < 1) {
      return { valid: false, error: 'Invalid URL format' };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

/**
 * Sanitize string input (remove dangerous characters)
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove null bytes and control characters
  let sanitized = input
    .replace(/\0/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim();

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Validate name field
 */
export function validateName(name: string): ValidationResult {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' };
  }

  const sanitized = sanitizeString(name, 100);
  
  if (sanitized.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }

  if (sanitized.length > 100) {
    return { valid: false, error: 'Name is too long' };
  }

  // Check for potentially malicious patterns
  if (/<script|javascript:|onerror=|onload=/i.test(sanitized)) {
    return { valid: false, error: 'Invalid characters in name' };
  }

  return { valid: true };
}

/**
 * Validate notes field
 */
export function validateNotes(notes: string | undefined): ValidationResult {
  if (!notes) {
    return { valid: true }; // Notes are optional
  }

  if (typeof notes !== 'string') {
    return { valid: false, error: 'Notes must be a string' };
  }

  const sanitized = sanitizeString(notes, 2000);
  
  if (sanitized.length > 2000) {
    return { valid: false, error: 'Notes are too long (max 2000 characters)' };
  }

  return { valid: true };
}

/**
 * Validate tier selection
 */
export function validateTier(tier: string): ValidationResult {
  const validTiers = ['starter', 'standard', 'professional', 'agency'];
  
  if (!tier || typeof tier !== 'string') {
    return { valid: false, error: 'Tier is required' };
  }

  if (!validTiers.includes(tier.toLowerCase())) {
    return { valid: false, error: 'Invalid tier selected' };
  }

  return { valid: true };
}

/**
 * Validate price (prevent price manipulation)
 */
export function validatePrice(price: number, expectedMin: number, expectedMax: number): ValidationResult {
  if (typeof price !== 'number' || isNaN(price)) {
    return { valid: false, error: 'Invalid price format' };
  }

  if (price < expectedMin || price > expectedMax) {
    return { valid: false, error: 'Price validation failed' };
  }

  return { valid: true };
}

