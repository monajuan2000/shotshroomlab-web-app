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

export const LIQUOR_CATEGORY_LABELS: Readonly<Record<LiquorCategory, string>> = {
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
