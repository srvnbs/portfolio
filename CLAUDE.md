# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Sai Sravan Biyyapu (Product Designer). Multi-page React app originally generated from a Figma design, deployed on Netlify at saisravan.netlify.app.

## Commands

- `npm run dev` — Start dev server on port 3000 (auto-opens browser)
- `npm run build` — Production build to `build/` directory

No test runner or linter is configured.

## Architecture

- **Vite + React 18 + TypeScript** with SWC for fast compilation
- **Tailwind CSS v4** — styles in `src/styles/globals.css` with CSS custom properties for light/dark theming (`.dark` class)
- **Framer Motion** (`motion/react`) for animations
- **React Router** (`react-router-dom`) for client-side routing
- **shadcn/ui components** in `src/components/ui/` — Radix UI primitives with Tailwind styling. Most are unused scaffolding from the Figma export.

### Routing

`src/main.tsx` sets up `BrowserRouter` with routes:
- `/` — Portfolio home (`src/App.tsx`)
- `/carroms` — Carrom board game (`src/pages/CarromGame.tsx`, lazy-loaded)

### Key Files

- `src/App.tsx` — Portfolio home page: hero section, dark mode toggle, custom cursor, SEO meta tags, and social links. Theme colors are defined inline as a `theme` object (not CSS variables).
- `src/main.tsx` — Entry point with routing setup and `Toaster` (sonner) provider.
- `src/styles/globals.css` — Tailwind v4 CSS with CSS custom properties for light/dark theming
- `src/components/figma/ImageWithFallback.tsx` — Image component with loading fallback

### Carrom Game

A standalone carrom board game at `/carroms`:
- `src/pages/CarromGame.tsx` — Main game page
- `src/components/carrom/` — Board, controls, modals, coin/striker SVG components
- `src/utils/carrom-physics.ts` — Physics engine for game mechanics
- `src/utils/carrom-ai.ts` — AI opponent logic
- `src/types/carrom.ts` — TypeScript types for the game

### Figma Asset Aliasing

`vite.config.ts` maps `figma:asset/*` imports to local files in `src/assets/`. It also aliases versioned npm package names (e.g., `lucide-react@0.487.0` → `lucide-react`) — this is from the Figma code export and should be preserved.

### Path Alias

`@` maps to `src/` (configured in `vite.config.ts`).

### Dark Mode

Implemented via state in `App.tsx` — toggles a `.dark` class on `<html>` and persists to localStorage. Falls back to system preference via `prefers-color-scheme`.

### Deployment

Netlify config is at `src/netlify.toml` — builds with `npm run build`, publishes `build/`, and has a SPA catch-all redirect.
