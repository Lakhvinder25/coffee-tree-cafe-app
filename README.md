<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/22e579ec-c7a2-4301-a975-82f23eabe951

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Run with Docker Compose

Copy [.env.example](./.env.example) to `.env`, then set `MYSQL_PASSWORD` and
`MYSQL_ROOT_PASSWORD` to different strong passwords. The `.env` file is ignored
by Git and must not be committed.

```bash
docker compose up --build -d
```

Open http://localhost:8080. The web app, auth API, and MySQL run together on a
private Docker network; MySQL is not published to the host. User records are
kept in the `coffee-tree-cafe-mysql-data` volume. Stop the services without
deleting stored data with:

```bash
docker compose down
```

Signup requires a name, email, password, and city; phone is optional. Passwords
are stored as salted scrypt hashes, and the API issues revocable, HTTP-only
session cookies. Set `SESSION_COOKIE_SECURE=true` when serving through HTTPS.

For Vite development, keep the Compose API running and use `npm run dev`; Vite
proxies `/api` requests to `localhost:3001`.
