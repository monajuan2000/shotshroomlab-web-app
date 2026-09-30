// Public API of the favorites feature.
export {
  FAVORITE_KINDS,
  type FavoriteKind,
  type FavoritesState,
} from './model/favorites.ts'
export { FavoritesProvider } from './context/FavoritesProvider.tsx'
export { useFavorites } from './hooks/useFavorites.ts'
export { FavoriteButton } from './components/FavoriteButton/index.ts'
