# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Sai Sravan Biyyapu (Senior Product Designer). Multi-page React SPA originally generated from a Figma design (Figma Make), deployed on Netlify at saisravan.netlify.app.

## Commands

- `npm run dev` — Dev server on port 3000 (auto-opens browser)
- `npm run build` — Production build to `build/`
- `npx tsc --noEmit` — Type-check (there is no test runner or linter)

## Architecture

- **Vite 6 + React 18 + TypeScript** (SWC plugin)
- **Tailwind CSS v4** via `@tailwindcss/vite`; base styles in `src/styles/globals.css`
- **Framer Motion** (imported as `motion/react`), **React Router v7**, **sonner** toasts
- `src/components/ui/` — only a few shadcn/Radix pieces remain (button, card, dialog)

### Routing and layout

`src/main.tsx` defines all routes inside `BrowserRouter`, wrapped in `<Layout>`. Every page except `/` is lazy-loaded with a `Suspense` fallback.

- `/` — home (`src/App.tsx`)
- `/projects`, `/projects/:id` — work listing and case-study detail
- `/experiments` and `/experiments/{carroms,marble-solitaire,terminal}` — mini-games/experiments; the index list lives in the `experiments` array in `src/pages/Experiments.tsx`
- `/playground`, `/playground/letter-rain` — **dev-only**: registered only when `import.meta.env.DEV`, so they don't exist in production builds (BottomNav shows the Playground link conditionally too)
- `/contact`

Adding a page means: add the lazy import + `<Route>` in `main.tsx`, and if it should appear in navigation, update `src/components/BottomNav.tsx` (active state is computed from `pathname` prefixes).

### Theming

Dark mode lives in `src/components/Layout.tsx`, not in pages. It exposes `useTheme()` → `{ darkMode, toggleDarkMode, theme }`, where `theme` is a JS object of hex colors (`bg`, `text`, `textSecondary`, `textMuted`, `accent`, `cardBg`, `border`, `cursor`). Pages style colors inline from this object (`style={{ color: theme.text }}`) rather than via Tailwind color classes or CSS variables. Layout also:
- persists the choice to `localStorage['theme']`, falls back to `prefers-color-scheme`, and toggles `.dark` on `<html>`
- animates the toggle with the View Transitions API from the click origin (`--theme-transition-x/y` CSS vars), skipped under `prefers-reduced-motion`
- renders the custom trail cursor (desktop/non-touch only) and the `BottomNav`

### Project / case-study content

`src/data/projects.ts` is the content source: `visibleProjects` (shown; also exported as `projects`) and `archivedProjects` (hidden). Each `Project` may have a `caseStudy` with sections of paragraphs + image paths. Images are served from `public/images/projects/<id>/` and referenced by absolute paths (`/images/...`). Company logos are in `public/images/company-logos/`.

### Carrom game

`src/pages/CarromGame.tsx` (page/state), `src/components/carrom/` (board, controls, modals; `imports/` holds Figma-exported SVG components), `src/utils/carrom-physics.ts` (physics), `src/utils/carrom-ai.ts` (AI opponent), `src/types/carrom.ts`. `carroms.md` at the repo root is a log of the Figma Make conversation describing the intended scoring rules (single game; 1 pt per coin pocketed by the current shooter, +2 for the queen, winner gets bonus for opponent's remaining coins).

### Vite aliases (preserve)

`vite.config.ts` maps `@` → `src/`, maps `figma:asset/*.png` imports to `src/assets/`, and aliases versioned package names (e.g. `lucide-react@0.487.0` → `lucide-react`) left over from the Figma export.

### Deployment

Netlify: `src/netlify.toml` (build `npm run build`, publish `build/`) plus `public/_redirects` for the SPA catch-all.
