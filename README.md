# Go Green

An elite autoflower cannabis cultivation guide app built with React, TypeScript, and Vite.

## Features

- **Equipment Validation Checklist** — Verify DNC soil, 7-gallon pots, hygrometer, tensiometer, UVB, loupe
- **Germination Pathway Selector** — Direct Potting (Starter Pocket) or Solo Cup to 7-Gallon (Cyclops) Transplant
- **Day-by-Day Grow Timeline** — 67-day autoflower guide from sprout through harvest with watering volumes, environmental targets, and training instructions
- **Environmental Logger** — Track temperature, humidity, soil tension, and watering per day
- **Subzero Late-Flower Frost Protocol** — 14-day stress protocol: UVB blast, night temp drops, extreme drybacks, ice water flush, total darkness
- **Execution Guardrails** — No synthetic recommendations, autoflower timing safeguards, harvest-by-trichome rules

## Tech Stack

- React 19 + TypeScript
- Vite (deploys natively to Vercel)
- No build dependencies beyond Vite plugin-react

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/` — ready for Vercel.

## Deploy

This app is configured for instant deploy to Vercel. Connect the repo and Vercel auto-detects the Vite build settings.

---

*The trichomes under the loupe always dictate the final timeline, not just the calendar day.*
