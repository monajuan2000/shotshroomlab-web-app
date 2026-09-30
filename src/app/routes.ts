import { lazy } from 'react'
import { ROUTE_PATTERNS } from '../shared/config/routes.ts'
import type { RouteDefinition } from '../shared/router/index.ts'

// Each page is loaded on demand so the first visit only downloads what it needs.
const HomePage = lazy(() =>
  import('../pages/HomePage/index.ts').then((module) => ({ default: module.HomePage })),
)
const CocktailsPage = lazy(() =>
  import('../pages/CocktailsPage/index.ts').then((module) => ({ default: module.CocktailsPage })),
)
const CocktailDetailPage = lazy(() =>
  import('../pages/CocktailDetailPage/index.ts').then((module) => ({
    default: module.CocktailDetailPage,
  })),
)
const LiquorsPage = lazy(() =>
  import('../pages/LiquorsPage/index.ts').then((module) => ({ default: module.LiquorsPage })),
)
const LiquorDetailPage = lazy(() =>
  import('../pages/LiquorDetailPage/index.ts').then((module) => ({
    default: module.LiquorDetailPage,
  })),
)
const FavoritesPage = lazy(() =>
  import('../pages/FavoritesPage/index.ts').then((module) => ({ default: module.FavoritesPage })),
)
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage/index.ts').then((module) => ({ default: module.NotFoundPage })),
)

/** Order matters: the first matching route wins, so keep the wildcard last. */
export const APP_ROUTES: readonly RouteDefinition[] = [
  { path: ROUTE_PATTERNS.home, component: HomePage },
  { path: ROUTE_PATTERNS.cocktails, component: CocktailsPage },
  { path: ROUTE_PATTERNS.cocktail, component: CocktailDetailPage },
  { path: ROUTE_PATTERNS.liquors, component: LiquorsPage },
  { path: ROUTE_PATTERNS.liquor, component: LiquorDetailPage },
  { path: ROUTE_PATTERNS.favorites, component: FavoritesPage },
  { path: ROUTE_PATTERNS.notFound, component: NotFoundPage },
]
