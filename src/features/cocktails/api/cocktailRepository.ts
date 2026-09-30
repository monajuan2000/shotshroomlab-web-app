import { COCKTAILS } from '../data/cocktails.ts'
import type { Cocktail } from '../model/cocktail.ts'

/**
 * Data access contract for cocktails. The UI only depends on this interface,
 * so the local catalog can be replaced by a remote API without touching components.
 */
export interface CocktailRepository {
  getAll(): Promise<readonly Cocktail[]>
  getById(id: string): Promise<Cocktail | undefined>
}

export function createInMemoryCocktailRepository(source: readonly Cocktail[]): CocktailRepository {
  return {
    getAll: async () => source,
    getById: async (id) => source.find((cocktail) => cocktail.id === id),
  }
}

export const cocktailRepository: CocktailRepository = createInMemoryCocktailRepository(COCKTAILS)
