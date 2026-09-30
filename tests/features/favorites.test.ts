import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  EMPTY_FAVORITES,
  countFavorites,
  isFavorite,
  isFavoritesState,
  toggleFavorite,
} from '../../src/features/favorites/model/favorites.ts'

describe('favorites', () => {
  it('adds new favorites first and removes them on a second toggle', () => {
    const once = toggleFavorite(EMPTY_FAVORITES, 'cocktail', 'negroni')
    const twice = toggleFavorite(once, 'cocktail', 'mojito')
    assert.deepEqual(twice.cocktail, ['mojito', 'negroni'])
    assert.equal(isFavorite(twice, 'cocktail', 'negroni'), true)
    assert.equal(isFavorite(twice, 'liquor', 'negroni'), false)

    const removed = toggleFavorite(twice, 'cocktail', 'negroni')
    assert.deepEqual(removed.cocktail, ['mojito'])
  })

  it('counts favorites across kinds', () => {
    const state = toggleFavorite(toggleFavorite(EMPTY_FAVORITES, 'cocktail', 'a'), 'liquor', 'b')
    assert.equal(countFavorites(state), 2)
  })

  it('validates data read from storage', () => {
    assert.equal(isFavoritesState({ cocktail: ['a'], liquor: [] }), true)
    assert.equal(isFavoritesState({ cocktail: ['a'] }), false)
    assert.equal(isFavoritesState({ cocktail: [1], liquor: [] }), false)
    assert.equal(isFavoritesState(null), false)
    assert.equal(isFavoritesState(['a']), false)
  })
})
