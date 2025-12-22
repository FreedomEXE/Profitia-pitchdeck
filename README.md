# Private Deck Viewer

A tiny, private pitch-deck viewer built with Next.js App Router, TailwindCSS, server actions, and signed cookie sessions.

## Setup

```bash
pnpm create next-app@latest profitria-pitchdeck --ts --app --tailwind --eslint
cd profitria-pitchdeck
pnpm install
```

Then copy env vars and start the dev server:

```bash
cp .env.example .env.local
pnpm dev
```

## Environment variables

- `SESSION_SECRET` (required): at least 32 characters; used to sign the session cookie.
- `DECK_PASSWORD` (preferred): single global password that works with any username.
- `DECK_USERS_JSON` (optional fallback): JSON array of user objects, e.g. `[{"user":"pandora","pass":"secret"}]`.

If `DECK_PASSWORD` is set, it takes precedence over `DECK_USERS_JSON`.

## Replace logo

- `public/logo.png`: replace with your logo image.

## Deploy to Vercel

1. Push the repo to GitHub.
2. Create a new Vercel project and import the repo.
3. Add `SESSION_SECRET` and your auth env vars in the Vercel project settings.
4. Deploy.

## Sanity test checklist

- Visit `/` and confirm the logo, subtitle, and sign-in button render.
- Attempt a login with bad credentials and confirm the error message.
- Login with correct credentials and confirm redirect to `/deck`.
- Confirm `/deck` shows the Beautiful.ai presentation in the iframe.
- Confirm the "Open fullscreen" button opens the deck in a new tab.
- Confirm logout clears the session and redirects to `/login`.
