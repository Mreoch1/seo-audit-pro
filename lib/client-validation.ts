/**
 * Client-side validation utilities
 * Mirrors server-side validation for better UX
 */

export interface ValidationError {
  field: string;
  message: string;
}

export function validateEmailClient(email: string): ValidationError | null {
  if (!email || email.trim().length === 0) {
    return { field: 'email', message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { field: 'email', message: 'Please enter a valid email address' };
  }

  if (email.length > 254) {
    return { field: 'email', message: 'Email is too long' };
  }

  return null;
}

export function validateURLClient(url: string): ValidationError | null {
  if (!url || url.trim().length === 0) {
    return { field: 'websiteUrl', message: 'Website URL is required' };
  }

  let urlToCheck = url.trim();
  
  // Add protocol if missing
  if (!urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
    urlToCheck = `https://${urlToCheck}`;
  }

  try {
    const urlObj = new URL(urlToCheck);
    
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { field: 'websiteUrl', message: 'URL must use http or https' };
    }

    if (!urlObj.hostname || urlObj.hostname.length < 1) {
      return { field: 'websiteUrl', message: 'Please enter a valid website URL' };
    }

    return null;
  } catch {
    return { field: 'websiteUrl', message: 'Please enter a valid website URL' };
  }
}

export function validateNameClient(name: string): ValidationError | null {
  if (!name || name.trim().length === 0) {
    return { field: 'name', message: 'Name is required' };
  }

  if (name.trim().length < 2) {
    return { field: 'name', message: 'Name must be at least 2 characters' };
  }

  if (name.length > 100) {
    return { field: 'name', message: 'Name is too long (max 100 characters)' };
  }

  return null;
}

export function validateNotesClient(notes: string): ValidationError | null {
  if (!notes) {
    return null; // Notes are optional
  }

  if (notes.length > 2000) {
    return { field: 'notes', message: 'Notes are too long (max 2000 characters)' };
  }

  return null;
}

