# AGENTS.md

This repository contains Lensdesk, an early React/Vite prototype for an evidence-first desktop workspace for social media research and multi-account content strategy.

## Product Direction

Lensdesk is not a generic chatbot and not an enterprise social listening dashboard.

The core product idea is:

- Users manage multiple social/content accounts.
- Each account has an Account Lens: audience, tone, stance, content pillars, and boundaries.
- Users collect social media evidence: links, quotes, screenshots, comments, and field notes.
- AI-assisted analysis should interpret evidence through the selected account lens.
- The output should become research memos, cultural observations, content angles, and account strategy.

When making product or UI decisions, prefer an evidence-first research desk over a chat-first wrapper.

## Current Stack

- React
- TypeScript
- Vite
- Lucide React icons
- Oxlint

## Common Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Project Structure

- `src/App.tsx`: current prototype data model, state, and main UI.
- `src/App.css`: product UI layout and component styling.
- `src/index.css`: global CSS variables and reset.
- `docs/lensdesk-prototype.png`: README preview image.

## Design Principles

- Keep the UI calm, editorial, and research-grade.
- Preserve the three-pane desktop workspace: account/project context, evidence stream, insight/lens panel.
- Account Lens is a first-class concept, not a decorative profile picker.
- Evidence should remain the center of the product. Chat is a contextual reasoning interface.
- Prefer small, precise controls, subtle borders, restrained shadows, and compact Mac-style density.
- Avoid marketing-page patterns, oversized hero sections, decorative blobs, purple gradients, and generic AI-dashboard aesthetics.
- Avoid turning every output into chat bubbles; analysis should feel like memo-ready research.

## Implementation Notes

- Keep edits scoped and consistent with the existing React component style.
- Use TypeScript types for product entities before adding new data shapes.
- Use `lucide-react` for icons rather than custom inline SVGs when an icon exists.
- Keep text short enough to fit compact desktop widths.
- Run `npm run build` and `npm run lint` before handing off code changes.
- Do not commit `node_modules` or `dist`.

## Near-Term Product Work

Useful next steps:

- Add local persistence for accounts, projects, evidence, and notes.
- Add an Add Material flow for links, text, screenshots, and observations.
- Add analysis templates for culture research, market research, and content strategy.
- Add a memo editor with source-linked citations.
- Package as a Mac desktop app with Tauri after the core workflow stabilizes.
