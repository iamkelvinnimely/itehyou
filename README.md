# iTehYou Landing Page

Pre-launch waitlist landing page for **iTehYou** — a platform for African music with global reach.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Tally.so for waitlist (no backend)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tally.so setup

1. Create a waitlist form on [tally.so](https://tally.so) (recommended fields: Full Name, Email, optional role).
2. Copy the form ID from the form URL: `https://tally.so/r/FORM_ID`.
3. Set it in `.env.local`:

```env
NEXT_PUBLIC_TALLY_FORM_ID=your_form_id_here
```

4. Restart the dev server. All **Join the Waitlist** buttons open the Tally popup.

If the form ID is missing or still the placeholder, the button opens tally.so as a fallback.

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Local development server |
| `npm run build` | Production build       |
| `npm run start` | Serve production build |
| `npm run lint`  | ESLint                 |

## Standout features

- Hero film loop (`public/videos/hero.mp4`) with photo fallback
- Ambient **Sound on / Sound off** control (Web Audio pad — user opt-in)
- Branded waitlist success overlay with share action (fires after Tally submit, or immediately in preview when no form ID is set)


Deploy to [Vercel](https://vercel.com). Add these environment variables:

- `NEXT_PUBLIC_TALLY_FORM_ID` — your Tally form ID
- `NEXT_PUBLIC_SITE_URL` — production URL (for correct Open Graph image links)
