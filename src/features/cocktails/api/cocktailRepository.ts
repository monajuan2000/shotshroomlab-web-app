import type { Locale } from '../../../shared/i18n/locales.ts'
import { COCKTAILS } from '../data/cocktails.ts'
import { COCKTAILS_ES } from '../data/cocktails.es.ts'
import type { Cocktail } from '../model/cocktail.ts'
import { translateCocktail, type CocktailCatalogTranslation } from '../model/cocktailTranslation.ts'

/**
 * Data access contract for cocktails. The UI only depends on this interface,
 * so the local catalog can be replaced by a remote API without touching components.
 * Texts come back in the requested locale.
 */
export interface CocktailRepository {
  getAll(locale: Locale): Promise<readonly Cocktail[]>
  getById(id: string, locale: Locale): Promise<Cocktail | undefined>
}

/** The source catalog is written in English; other locales are applied on top of it. */
export type CocktailTranslations = Partial<Record<Locale, CocktailCatalogTranslation>>

export function createInMemoryCocktailRepository(
  source: readonly Cocktail[],
  translations: CocktailTranslations = {},
): CocktailRepository {
  const cache = new Map<Locale, readonly Cocktail[]>()

  function getCatalog(locale: Locale): readonly Cocktail[] {
    const translation = translations[locale]
    if (!translation) return source

    let catalog = cache.get(locale)
    if (!catalog) {
      catalog = source.map((cocktail) => translateCocktail(cocktail, translation))
      cache.set(locale, catalog)
    }
    return catalog
  }

  return {
    getAll: async (locale) => getCatalog(locale),
    getById: async (id, locale) => getCatalog(locale).find((cocktail) => cocktail.id === id),
  }
}

export const cocktailRepository: CocktailRepository = createInMemoryCocktailRepository(COCKTAILS, {
  es: COCKTAILS_ES,
})
