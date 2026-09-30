import { isStringArray } from '../../../shared/lib/guards.ts'

export const FAVORITE_KINDS = ['cocktail', 'liquor'] as const

export type FavoriteKind = (typeof FAVORITE_KINDS)[number]

/** Saved ids per kind, most recently added first. */
export type FavoritesState = Readonly<Record<FavoriteKind, readonly string[]>>

export const EMPTY_FAVORITES: FavoritesState = { cocktail: [], liquor: [] }

export function isFavoritesState(value: unknown): value is FavoritesState {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return FAVORITE_KINDS.every((kind) => isStringArray(record[kind]))
}

export function isFavorite(state: FavoritesState, kind: FavoriteKind, id: string): boolean {
  return state[kind].includes(id)
}

export function toggleFavorite(state: FavoritesState, kind: FavoriteKind, id: string): FavoritesState {
  const ids = state[kind]
  return {
    ...state,
    [kind]: ids.includes(id) ? ids.filter((savedId) => savedId !== id) : [id, ...ids],
  }
}

export function countFavorites(state: FavoritesState): number {
  return FAVORITE_KINDS.reduce((total, kind) => total + state[kind].length, 0)
}
