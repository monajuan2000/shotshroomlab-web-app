import type { Locale } from '../../../shared/i18n/locales.ts'
import { LIQUORS } from '../data/liquors.ts'
import { LIQUORS_ES } from '../data/liquors.es.ts'
import { translateLiquor, type Liquor, type LiquorCatalogTranslation } from '../model/liquor.ts'

/**
 * Data access contract for liquors. The UI only depends on this interface, so
 * the local catalog can be replaced by a remote API without touching components.
 * Texts come back in the requested locale.
 */
export interface LiquorRepository {
  getAll(locale: Locale): Promise<readonly Liquor[]>
  getById(id: string, locale: Locale): Promise<Liquor | undefined>
}

/** The source catalog is written in English; other locales are applied on top of it. */
export type LiquorTranslations = Partial<Record<Locale, LiquorCatalogTranslation>>

export function createInMemoryLiquorRepository(
  source: readonly Liquor[],
  translations: LiquorTranslations = {},
): LiquorRepository {
  const cache = new Map<Locale, readonly Liquor[]>()

  function getCatalog(locale: Locale): readonly Liquor[] {
    const translation = translations[locale]
    if (!translation) return source

    let catalog = cache.get(locale)
    if (!catalog) {
      catalog = source.map((liquor) => translateLiquor(liquor, translation))
      cache.set(locale, catalog)
    }
    return catalog
  }

  return {
    getAll: async (locale) => getCatalog(locale),
    getById: async (id, locale) => getCatalog(locale).find((liquor) => liquor.id === id),
  }
}

export const liquorRepository: LiquorRepository = createInMemoryLiquorRepository(LIQUORS, {
  es: LIQUORS_ES,
})
