import { createContext } from 'react'
import type { FavoriteKind, FavoritesState } from '../model/favorites.ts'

export interface FavoritesContextValue {
  favorites: FavoritesState
  totalCount: number
  isFavorite: (kind: FavoriteKind, id: string) => boolean
  toggleFavorite: (kind: FavoriteKind, id: string) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)
