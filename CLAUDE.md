# CLAUDE.md

## Project

Lensdesk is an early product prototype for a social media research desktop app.

It helps creators, researchers, and brand strategists collect social media evidence and interpret it through different account lenses.

## North Star

Build an evidence-first research workspace, not another generic chatbot.

The user should feel they are working with:

- account lenses
- research projects
- evidence clips
- themes and tensions
- memo-ready insights
- contextual AI reasoning

## Current App

The prototype is a Vite + React + TypeScript app.

Important files:

- `src/App.tsx`: sample data, product model, main app layout.
- `src/App.css`: desktop UI styling.
- `src/index.css`: global variables and reset.
- `README.md`: public-facing project overview.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

Run build and lint after code changes.

## Product Model

Current core entities:

- Account: a social/content account with a handle, audience, tone, lens, boundaries, pillars, and accent color.
- Project: a research topic attached to an account.
- Evidence: a captured item such as a link, quote, screenshot, or note.
- Insight tab: themes, tensions, or memo.

Do not collapse accounts into generic folders. The Account Lens concept is central.

## Design Guidance

Maintain a polished Mac desktop feel:

- warm off-white surfaces
- deep moss accent
- subtle borders
- compact typography
- low shadow
- precise spacing
- three-column layout

Avoid:

- generic SaaS dashboard styling
- heavy cards everywhere
- large gradients
- AI chatbot wrapper patterns
- noisy enterprise analytics
- decorative illustrations that do not support the research workflow

## Interaction Guidance

The main workflow should stay:

1. Pick an account lens.
2. Select a research project.
3. Review evidence.
4. Interpret themes, tensions, and memo angles.
5. Ask follow-up questions through the current account lens.

When adding features, make sure they support this workflow.
