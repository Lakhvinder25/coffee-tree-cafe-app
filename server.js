import crypto from 'node:crypto';
import { promisify } from 'node:util';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);
const sessionCookieName = 'coffee_tree_session';
const sessionDurationMs = 12 * 60 * 60 * 1000;
const sessionCookieSecure = process.env.SESSION_COOKIE_SECURE === 'true';
const scrypt = promisify(crypto.scrypt);
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'cafedata',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'cafedata',
  waitForConnections: true,
  connectionLimit: 10,
  timezone: 'Z',
});

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '10kb' }));

const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts. Please try again later.' },
});

function asyncRoute(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateEmail(email) {
  return typeof email === 'string'
    && email.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateSignup(body) {
  if (!isRecord(body)) {
    return { error: 'Please provide your signup details.' };
  }

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const city = typeof body.city === 'string' ? body.city.trim() : '';
  const password = body.password;

  if (!fullName || fullName.length > 120) {
    return { error: 'Name must be between 1 and 120 characters.' };
  }
  if (!validateEmail(email)) {
    return { error: 'Please provide a valid email address.' };
  }
  if (phone.length > 32) {
    return { error: 'Phone number must be 32 characters or fewer.' };
  }
  if (!city || city.length > 100) {
    return { error: 'City must be between 1 and 100 characters.' };
  }
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) {
    return { error: 'Password must be between 8 and 128 characters.' };
  }

  return { value: { fullName, email, phone: phone || null, city, password } };
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const derivedKey = await scrypt(password, salt, 64, {
    N: 32768,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024,
  });
  return `scrypt$${salt.toString('base64url')}$${derivedKey.toString('base64url')}`;
}

async function verifyPassword(password, storedHash) {
  const [algorithm, saltValue, keyValue] = String(storedHash).split('$');
  if (algorithm !== 'scrypt' || !saltValue || !keyValue) {
    return false;
  }

  const salt = Buffer.from(saltValue, 'base64url');
  const expectedKey = Buffer.from(keyValue, 'base64url');
  if (salt.length !== 16 || expectedKey.length !== 64) {
    return false;
  }

  const actualKey = await scrypt(password, salt, expectedKey.length, {
    N: 32768,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024,
  });
  return crypto.timingSafeEqual(actualKey, expectedKey);
}

function getSessionToken(req) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return null;
  }

  const cookie = cookieHeader.split(';').map((part) => part.trim())
    .find((part) => part.startsWith(`${sessionCookieName}=`));
  const token = cookie?.slice(sessionCookieName.length + 1);
  return token && /^[A-Za-z0-9_-]{43}$/.test(token) ? token : null;
}

function hashSessionToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function setSessionCookie(res, token) {
  const parts = [
    `${sessionCookieName}=${token}`,
    'Path=/',
    `Max-Age=${Math.floor(sessionDurationMs / 1000)}`,
    'HttpOnly',
    'SameSite=Lax',
  ];
  if (sessionCookieSecure) {
    parts.push('Secure');
  }
  res.setHeader('Set-Cookie', parts.join('; '));
}

function clearSessionCookie(res) {
  const parts = [
    `${sessionCookieName}=`,
    'Path=/',
    'Max-Age=0',
    'HttpOnly',
    'SameSite=Lax',
  ];
  if (sessionCookieSecure) {
    parts.push('Secure');
  }
  res.setHeader('Set-Cookie', parts.join('; '));
}

async function createSession(userId, res) {
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashSessionToken(token);
  const expiresAt = new Date(Date.now() + sessionDurationMs);

  await pool.execute(
    'INSERT INTO auth_sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)',
    [tokenHash, userId, expiresAt],
  );
  setSessionCookie(res, token);
}

function serializeUser(user) {
  return {
    id: String(user.id),
    fullName: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    createdAt: new Date(user.created_at).toISOString(),
  };
}

function isDuplicateEmailError(error) {
  return error && error.code === 'ER_DUP_ENTRY';
}

app.get('/api/health', asyncRoute(async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ status: 'ok' });
}));

app.post('/api/auth/signup', authRateLimit, asyncRoute(async (req, res) => {
  const signup = validateSignup(req.body);
  if (signup.error) {
    return res.status(400).json({ error: signup.error });
  }

  const passwordHash = await hashPassword(signup.value.password);
  let userId;
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, phone, password_hash, city) VALUES (?, ?, ?, ?, ?)',
      [
        signup.value.fullName,
        signup.value.email,
        signup.value.phone,
        passwordHash,
        signup.value.city,
      ],
    );
    userId = result.insertId;
  } catch (error) {
    if (isDuplicateEmailError(error)) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }
    throw error;
  }

  const [users] = await pool.execute(
    'SELECT id, name, email, phone, city, created_at FROM users WHERE id = ?',
    [userId],
  );
  const user = users[0];
  await createSession(userId, res);
  return res.status(201).json({ user: serializeUser(user) });
}));

app.post('/api/auth/login', authRateLimit, asyncRoute(async (req, res) => {
  if (!isRecord(req.body)) {
    return res.status(400).json({ error: 'Please provide your login details.' });
  }

  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = req.body.password;
  if (!validateEmail(email) || typeof password !== 'string' || password.length === 0) {
    return res.status(400).json({ error: 'Please provide a valid email and password.' });
  }

  const [users] = await pool.execute(
    'SELECT id, name, email, phone, city, password_hash, created_at FROM users WHERE email = ? LIMIT 1',
    [email],
  );
  const user = users[0];
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    return res.status(401).json({ error: 'Email or password is incorrect.' });
  }

  await createSession(user.id, res);
  return res.json({ user: serializeUser(user) });
}));

app.get('/api/auth/me', asyncRoute(async (req, res) => {
  const token = getSessionToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Not signed in.' });
  }

  const [users] = await pool.execute(
    `SELECT users.id, users.name, users.email, users.phone, users.city, users.created_at
       FROM auth_sessions
       JOIN users ON users.id = auth_sessions.user_id
      WHERE auth_sessions.token_hash = ? AND auth_sessions.expires_at > UTC_TIMESTAMP(3)
      LIMIT 1`,
    [hashSessionToken(token)],
  );
  if (users.length === 0) {
    clearSessionCookie(res);
    return res.status(401).json({ error: 'Session expired. Please sign in again.' });
  }

  return res.json({ user: serializeUser(users[0]) });
}));

app.post('/api/auth/logout', asyncRoute(async (req, res) => {
  const token = getSessionToken(req);
  if (token) {
    await pool.execute('DELETE FROM auth_sessions WHERE token_hash = ?', [hashSessionToken(token)]);
  }
  clearSessionCookie(res);
  return res.status(204).end();
}));

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'API route not found.' });
});

app.use((error, _req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body must be valid JSON.' });
  }

  console.error('API request failed:', error);
  return res.status(500).json({ error: 'The request could not be completed.' });
});

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(254) NOT NULL,
      phone VARCHAR(32) NULL,
      password_hash VARCHAR(180) NOT NULL,
      city VARCHAR(100) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY users_email_unique (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS auth_sessions (
      token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
      user_id BIGINT UNSIGNED NOT NULL,
      expires_at DATETIME(3) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (token_hash),
      KEY auth_sessions_user_id_idx (user_id),
      KEY auth_sessions_expires_at_idx (expires_at),
      CONSTRAINT auth_sessions_user_fk
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  `);
}

async function start() {
  await initializeDatabase();
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Auth API listening on port ${port}`);
  });

  const cleanupTimer = setInterval(() => {
    pool.execute('DELETE FROM auth_sessions WHERE expires_at <= UTC_TIMESTAMP(3)')
      .catch((error) => console.error('Expired session cleanup failed:', error));
  }, 60 * 60 * 1000);
  cleanupTimer.unref();

  for (const signal of ['SIGINT', 'SIGTERM']) {
    process.once(signal, () => {
      clearInterval(cleanupTimer);
      server.close(() => {
        pool.end().then(() => process.exit(0));
      });
    });
  }
}

start().catch((error) => {
  console.error('Failed to start the auth API:', error);
  pool.end().finally(() => process.exit(1));
});
