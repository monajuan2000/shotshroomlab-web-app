import { useCallback, useMemo, type ReactNode } from 'react'
import { APP_CONFIG } from '../../../shared/config/appConfig.ts'
import { usePersistentState } from '../../../shared/hooks/usePersistentState.ts'
import {
  EMPTY_FAVORITES,
  countFavorites,
  isFavorite,
  isFavoritesState,
  toggleFavorite,
  type FavoriteKind,
} from '../model/favorites.ts'
import { FavoritesContext, type FavoritesContextValue } from './FavoritesContext.ts'

interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = usePersistentState(
    APP_CONFIG.storageKeys.favorites,
    EMPTY_FAVORITES,
    isFavoritesState,
  )

  const toggle = useCallback(
    (kind: FavoriteKind, id: string) => setFavorites((current) => toggleFavorite(current, kind, id)),
    [setFavorites],
  )

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      totalCount: countFavorites(favorites),
      isFavorite: (kind, id) => isFavorite(favorites, kind, id),
      toggleFavorite: toggle,
    }),
    [favorites, toggle],
  )

  return <FavoritesContext value={value}>{children}</FavoritesContext>
}
