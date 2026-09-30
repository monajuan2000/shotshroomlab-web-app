import type { Locale, Localized } from '../../../shared/i18n/locales.ts'

export const LIQUOR_CATEGORIES = [
  'whiskey',
  'vodka',
  'gin',
  'rum',
  'tequila',
  'mezcal',
  'brandy',
  'liqueur',
  'aperitif',
  'fortified-wine',
  'bitters',
] as const

export type LiquorCategory = (typeof LIQUOR_CATEGORIES)[number]

export const LIQUOR_CATEGORY_LABELS: Localized<Record<LiquorCategory, string>> = {
  en: {
    whiskey: 'Whiskey',
    vodka: 'Vodka',
    gin: 'Gin',
    rum: 'Rum',
    tequila: 'Tequila',
    mezcal: 'Mezcal',
    brandy: 'Brandy',
    liqueur: 'Liqueur',
    aperitif: 'Aperitif',
    'fortified-wine': 'Fortified wine',
    bitters: 'Bitters',
  },
  es: {
    whiskey: 'Whisky',
    vodka: 'Vodka',
    gin: 'Ginebra',
    rum: 'Ron',
    tequila: 'Tequila',
    mezcal: 'Mezcal',
    brandy: 'Brandy',
    liqueur: 'Licor',
    aperitif: 'Aperitivo',
    'fortified-wine': 'Vino fortificado',
    bitters: 'Amargos',
  },
}

export interface Liquor {
  /** URL friendly, unique and stable: other data references it. */
  id: string
  name: string
  category: LiquorCategory
  /** Alcohol by volume, in percent. */
  abv: number
  origin: string
  description: string
  flavorNotes: readonly string[]
  servingSuggestions: readonly string[]
  /** Hex color used for the illustration. */
  color: string
}

const ABV_FORMATS: Localized<(abv: number) => string> = {
  en: (abv) => `${abv}% ABV`,
  es: (abv) => `${abv}% vol.`,
}

/** Alcohol strength as it is usually written in each language. */
export function formatAbv(abv: number, locale: Locale = 'en'): string {
  return ABV_FORMATS[locale](abv)
}

/** Texts of one liquor in another locale. Omitted optional fields keep the English value. */
export interface LiquorTranslation {
  name?: string
  origin: string
  description: string
  flavorNotes: readonly string[]
  servingSuggestions: readonly string[]
}

/** Translations of the catalog for one locale, keyed by liquor id. */
export type LiquorCatalogTranslation = Readonly<Record<string, LiquorTranslation>>

/** Returns the liquor with its texts replaced; untranslated liquors stay in English. */
export function translateLiquor(liquor: Liquor, translations: LiquorCatalogTranslation): Liquor {
  const translation = translations[liquor.id]
  if (!translation) return liquor

  return {
    ...liquor,
    name: translation.name ?? liquor.name,
    origin: translation.origin,
    description: translation.description,
    flavorNotes: translation.flavorNotes,
    servingSuggestions: translation.servingSuggestions,
  }
}
