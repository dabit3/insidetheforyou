# insidetheforyou

An interactive website that explains how the X "For You" feed decides what you see. All weights and behaviors come from the open-source [X algorithm repository](https://github.com/xai-org/x-algorithm) (August 2026 snapshot).

Built with [Devin](https://devin.ai).

## What the site shows

The site has five interactive sections and a slideshow:

- **Scoring lab**. Tap the actions that you take on a post and watch its score move. The section uses the real production weights.
- **Annotated demo feed**. A mock feed where each post shows the reasons for its rank.
- **Action effects**. A real post from X with the standard action buttons. Hover over an action to see its effect on your future feed.
- **Weight playground**. Sliders for the real ranking weights. Drag them and watch six posts re-rank in real time.
- **Deep dive**. A slideshow that covers the full pipeline: candidate sources, user signals, predictions, weights, adjustments, and the visibility gate.

## Run the project locally

1. Make sure that Node.js 18 or later is installed.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the URL that Vite prints, usually `http://localhost:5173`.

## Build for production

Run `npm run build`. The output goes to the `dist/` directory. The build runs the TypeScript compiler first, then Vite.

## Refresh the example posts

The "Action effects" section cycles through real posts from X. The posts live in `src/data/tweets.json`. A script fetches them at build time with the xAI API, so no API key ships to the browser.

To fetch a new set of posts:

1. Create a `.env` file in the project root.
2. Add one line: `XAI_API_KEY=your-key-here`. You can get a key at [console.x.ai](https://console.x.ai).
3. Run `npm run fetch:tweets`.

The script asks Grok to search X for popular programming posts with at least 100 likes. It validates the results and writes them to `src/data/tweets.json`. Profile pictures load from [unavatar.io](https://unavatar.io) at run time.

Note: do not commit the `.env` file. The `.gitignore` file already excludes it.

## Project structure

| Path | Content |
|---|---|
| `src/App.tsx` | Page layout, navigation, hero, deep-dive slideshow, and footer |
| `src/components/Reveal.tsx` | Shared section and scroll-reveal components |
| `src/sections/ScoreLab.tsx` | The scoring lab with the aura buttons |
| `src/sections/DemoFeed.tsx` | The annotated demo feed and the action-effects post |
| `src/sections/WeightLab.tsx` | The weight playground with sliders and presets |
| `src/sections/Weights.tsx` | The weight bar chart |
| `src/sections/Adjustments.tsx` | The score adjustment cards |
| `src/data/tweets.json` | The fetched example posts |
| `scripts/fetch-tweets.mjs` | The post-fetch script |

## Tech stack

- [React](https://react.dev) with TypeScript
- [Vite](https://vite.dev) for development and builds
- [Framer Motion](https://motion.dev) for animations
- [Oxlint](https://oxc.rs) for linting

## Data sources

The weights come from `home-mixer/params/param.rs` in the X algorithm repository. The scoring formula comes from `home-mixer/scorers/ranking_scorer.rs`. The values change over time as X runs experiments, so treat them as a snapshot, not a specification.

This project is not affiliated with X or xAI.
