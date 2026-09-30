import type { Localized } from '../../../shared/i18n/locales.ts'
import type { LiquorCategory } from '../../liquors/model/index.ts'

export const GLASS_TYPES = ['coupe', 'martini', 'rocks', 'highball', 'copper-mug', 'flute', 'wine'] as const
export type GlassType = (typeof GLASS_TYPES)[number]
export const GLASS_TYPE_LABELS: Localized<Record<GlassType, string>> = {
  en: {
    coupe: 'Coupe',
    martini: 'Martini glass',
    rocks: 'Rocks glass',
    highball: 'Highball',
    'copper-mug': 'Copper mug',
    flute: 'Flute',
    wine: 'Wine glass',
  },
  es: {
    coupe: 'Copa coupé',
    martini: 'Copa de martini',
    rocks: 'Vaso corto',
    highball: 'Vaso alto',
    'copper-mug': 'Taza de cobre',
    flute: 'Copa flauta',
    wine: 'Copa de vino',
  },
}

export const PREPARATION_METHODS = ['shaken', 'stirred', 'built', 'blended'] as const
export type PreparationMethod = (typeof PREPARATION_METHODS)[number]
export const PREPARATION_METHOD_LABELS: Localized<Record<PreparationMethod, string>> = {
  en: {
    shaken: 'Shaken',
    stirred: 'Stirred',
    built: 'Built in glass',
    blended: 'Blended',
  },
  es: {
    shaken: 'Agitado',
    stirred: 'Mezclado',
    built: 'Directo en el vaso',
    blended: 'Licuado',
  },
}

export const DIFFICULTY_LEVELS = ['easy', 'medium', 'advanced'] as const
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number]
export const DIFFICULTY_LEVEL_LABELS: Localized<Record<DifficultyLevel, string>> = {
  en: {
    easy: 'Easy',
    medium: 'Medium',
    advanced: 'Advanced',
  },
  es: {
    easy: 'Fácil',
    medium: 'Intermedio',
    advanced: 'Avanzado',
  },
}

export const FLAVOR_PROFILES = [
  'citrus',
  'sweet',
  'bitter',
  'herbal',
  'fruity',
  'smoky',
  'spicy',
  'creamy',
  'refreshing',
] as const
export type FlavorProfile = (typeof FLAVOR_PROFILES)[number]
export const FLAVOR_PROFILE_LABELS: Localized<Record<FlavorProfile, string>> = {
  en: {
    citrus: 'Citrus',
    sweet: 'Sweet',
    bitter: 'Bitter',
    herbal: 'Herbal',
    fruity: 'Fruity',
    smoky: 'Smoky',
    spicy: 'Spicy',
    creamy: 'Creamy',
    refreshing: 'Refreshing',
  },
  es: {
    citrus: 'Cítrico',
    sweet: 'Dulce',
    bitter: 'Amargo',
    herbal: 'Herbal',
    fruity: 'Frutal',
    smoky: 'Ahumado',
    spicy: 'Especiado',
    creamy: 'Cremoso',
    refreshing: 'Refrescante',
  },
}

export const COUNT_UNITS = ['dash', 'barspoon', 'leaf', 'piece', 'wedge', 'pinch'] as const
export type CountUnit = (typeof COUNT_UNITS)[number]

export type IngredientMeasure =
  | { kind: 'volume'; ml: number }
  | { kind: 'count'; value: number; unit: CountUnit }
  | { kind: 'to-taste'; note: string }

export interface Ingredient {
  name: string
  measure: IngredientMeasure
  /** Links the ingredient to a liquor in the catalog. */
  liquorId?: string
  optional?: boolean
}

export interface Cocktail {
  /** URL friendly, unique and stable. */
  id: string
  name: string
  tagline: string
  description: string
  baseCategory: LiquorCategory
  glass: GlassType
  method: PreparationMethod
  difficulty: DifficultyLevel
  flavors: readonly FlavorProfile[]
  ingredients: readonly Ingredient[]
  steps: readonly string[]
  garnish?: string
  prepMinutes: number
  /** Hex color of the finished drink, used for the illustration. */
  color: string
  isFeatured: boolean
}
