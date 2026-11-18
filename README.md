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

## Run with Docker

Build the production image:

```bash
docker build -t coffee-tree-cafe .
```

Start the app:

```bash
docker run --rm -p 8080:80 coffee-tree-cafe
```

Open http://localhost:8080.
