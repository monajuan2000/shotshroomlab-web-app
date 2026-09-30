# ShotShroom Lab

A responsive web application to explore classic cocktail recipes and the spirits behind them.

## Features

- **Cocktails catalog** with search (by name or ingredient), filters (base spirit, flavor, method, difficulty) and sorting. Filters live in the URL, so every view can be shared and bookmarked.
- **Cocktail recipes** with a servings scaler, ml / oz switch, step-by-step preparation and related suggestions.
- **Spirits catalog** with search, category filter and sorting by name or strength.
- **Spirit details** with flavor notes, serving ideas and the cocktails that use it.
- **Favorites** for cocktails and spirits, saved on the device.
- **Age verification** before entering the site.
- Light and dark themes (follows the system), keyboard and screen reader friendly, mobile first.

## Technology stack

- React 19 + TypeScript (strict mode)
- Vite 8
- CSS Modules with design tokens (no UI library)
- Node's built-in test runner (`node:test`) for domain logic
- ESLint with the React Hooks and React Refresh rules

The app has **no runtime dependencies besides React**. Routing is a small hash router in `src/shared/router`, so the app works on GitHub Pages without server rewrites. Its public API (`RouterProvider`, `Routes`, `Link`, `NavLink`, `useParams`, `useSearchParams`, …) mirrors React Router, so it can be replaced later by editing that folder only.

## Getting started

Requires Node.js 22.18 or newer (Node 24 recommended).

```bash
npm install
npm run dev
```

| Script              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the development server                         |
| `npm run build`     | Type check and build for production into `dist/`     |
| `npm run preview`   | Serve the production build locally                   |
| `npm run lint`      | Run ESLint                                           |
| `npm run typecheck` | Type check the app, the tests and the Vite config    |
| `npm run test`      | Run the unit tests                                   |
| `npm run check`     | Lint, type check and test (run before every commit)  |
| `npm run deploy`    | Build and publish `dist/` to GitHub Pages            |

## Architecture

The code is split into layers. **A layer may only import from the layers below it.**

```
src/
├── app/        Composition root: providers, routes, root layout
├── pages/      One folder per route; composes widgets and features
├── widgets/    Blocks that combine several features (header, cocktail grid, …)
├── features/   Self-contained business modules
│   ├── cocktails/
│   ├── liquors/
│   ├── favorites/
│   ├── preferences/
│   └── age-gate/
└── shared/     Code with no business knowledge: UI kit, router, hooks, helpers, styles
```

```
app → pages → widgets → features → shared
```

### Inside a feature

```
features/cocktails/
├── index.ts          Public API (components, hooks, model)
├── model/            Pure TypeScript: types, constants, filters, formatting
│   └── index.ts      Public API of the model (no React, no CSS)
├── data/             Local catalog
├── api/              Repository: the only place that knows where data comes from
├── hooks/            React hooks for the UI
└── components/       One component per folder
    └── CocktailCard/
        ├── CocktailCard.tsx
        ├── CocktailCard.module.css
        └── index.ts
```

### Rules

1. **Everything is in English**: code, comments, UI text, commit messages and documentation.
2. **Import other modules only through their public API**: `features/<name>/index.ts`, or `features/<name>/model/index.ts` for pure domain code.
3. **Features do not import other features**, with one exception: `cocktails` may use the `liquors` model (a cocktail has a base spirit). Combine features in `widgets/` or `pages/`, or pass UI through props (see the `action` slot of the cards).
4. **One component per folder**, with its CSS Module and an `index.ts`.
5. **Colors, spacing, radii and fonts come from tokens** in `src/shared/styles/tokens.css`. Do not hard-code them in components.
6. **Anything used in two or more places moves to `shared/`** (or to `widgets/` if it combines features).
7. **Keep the model pure**: filtering, sorting and formatting live in `model/` and are covered by tests.
8. **Data access goes through a repository** (`api/`). Pages and components never read `data/` directly.
9. **Validate everything read from outside** (URL, localStorage). Stored keys are versioned in `shared/config/appConfig.ts`.

### Common tasks

- **Add a cocktail or a spirit**: add an entry to `features/*/data/*.ts`. Never rename an existing `id`; other data and saved favorites reference it. `npm run test` checks the catalog for broken references.
- **Load data from an API**: implement `CocktailRepository` / `LiquorRepository` with `fetch` and export it from the feature's `api/` folder. The UI already handles loading and error states.
- **Add a page**: create `src/pages/<Name>Page/`, add its pattern and path builder to `shared/config/routes.ts` and register it in `app/routes.ts`.
- **Add a filter**: extend the filters type, `parse…Filters`, `to…SearchParams` and `apply…Filters` in the feature model, add a test, then add a `FilterGroup` to the filter panel.

## Deployment

The app is published to GitHub Pages under `/shotshroomlab-web-app/` (see `base` in `vite.config.ts`).

```bash
npm run deploy
```

## Documentation

- Software Requirements Specification (SRS)
- Architecture Decision Records (ADR)
