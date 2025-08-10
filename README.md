# Hausker Scientific

Production-ready Next.js + Tailwind site for Hausker Scientific. Built for Vercel hosting with an email contact form via Resend.

## Local Setup

```bash
pnpm i   # or: npm i / yarn
pnpm dev # http://localhost:3000
```

## Configure Email (Resend)

1. Create a [Resend](https://resend.com) account and API key.
2. Add the env vars in `.env.local`:
   ```
   RESEND_API_KEY=...
   CONTACT_TO_EMAIL=you@example.com
   CONTACT_FROM_EMAIL=website@hauskersci.com
   ```
3. In production, add the same env vars in your Vercel Project Settings → Environment Variables.

## Deploy to Vercel

- Push this repo to GitHub.
- In the Vercel dashboard, *Import Project* → select the repo → **Framework**: Next.js → Deploy.

## Content Edits

- Main content is in `app/page.tsx`. Swap the headshot URL with an image placed under `/public` for best performance.

## Accessibility & Performance

- Uses semantic sections, visible focus states (via Tailwind defaults), and optimized images through Next/Image.
- IntersectionObserver updates nav highlighting for better a11y vs. scroll math.

## License

MIT
