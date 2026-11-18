import { UserSession } from '../types/auth';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  city: string;
  createdAt: string;
}

interface AuthResponse {
  user: AuthUser;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseAuthUser(value: unknown): AuthUser {
  if (
    !isRecord(value)
    || typeof value.id !== 'string'
    || typeof value.fullName !== 'string'
    || typeof value.email !== 'string'
    || (value.phone !== null && typeof value.phone !== 'string')
    || typeof value.city !== 'string'
    || typeof value.createdAt !== 'string'
  ) {
    throw new Error('The server returned an invalid account response.');
  }

  return {
    id: value.id,
    fullName: value.fullName,
    email: value.email,
    phone: value.phone,
    city: value.city,
    createdAt: value.createdAt,
  };
}

async function parseAuthResponse(response: Response): Promise<AuthUser> {
  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new Error('The server returned an invalid response.');
  }

  if (!response.ok) {
    const message = isRecord(payload) && typeof payload.error === 'string'
      ? payload.error
      : 'The request could not be completed.';
    throw new Error(message);
  }

  if (!isRecord(payload) || !('user' in payload)) {
    throw new Error('The server returned an invalid account response.');
  }
  return parseAuthUser(payload.user);
}

function toUserSession(user: AuthUser): UserSession {
  const createdAt = new Date(user.createdAt);
  return {
    fullName: user.fullName,
    email: user.email,
    phone: user.phone ?? undefined,
    city: user.city,
    coffeeBeans: 25,
    memberTier: 'Inaugural Craft Member',
    preferredBrew: 'House Specialty',
    joinedDate: Number.isNaN(createdAt.getTime())
      ? 'Recently'
      : createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  };
}

async function requestAccount(path: string, body: Record<string, string>): Promise<AuthUser> {
  const response = await fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return parseAuthResponse(response);
}

export function registerAccount(details: {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}): Promise<AuthUser> {
  return requestAccount('/api/auth/signup', details);
}

export function loginAccount(email: string, password: string): Promise<AuthUser> {
  return requestAccount('/api/auth/login', { email, password });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const response = await fetch('/api/auth/me', { credentials: 'same-origin' });
  if (response.status === 401) {
    return null;
  }
  return parseAuthResponse(response);
}

export async function logoutAccount(): Promise<void> {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'same-origin',
  });
  if (!response.ok) {
    throw new Error('Could not sign out. Please try again.');
  }
}

export { toUserSession };
