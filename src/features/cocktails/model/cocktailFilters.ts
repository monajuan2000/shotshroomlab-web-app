import {
  readEnum,
  readEnumList,
  readString,
  writeEnum,
  writeList,
  writeString,
} from '../../../shared/lib/searchParams.ts'
import { compareText, matchesQuery } from '../../../shared/lib/text.ts'
import { LIQUOR_CATEGORIES, type LiquorCategory } from '../../liquors/model/index.ts'
import {
  DIFFICULTY_LEVELS,
  FLAVOR_PROFILES,
  PREPARATION_METHODS,
  type Cocktail,
  type DifficultyLevel,
  type FlavorProfile,
  type PreparationMethod,
} from './cocktail.ts'

export const COCKTAIL_SORT_ORDERS = ['name', 'quickest', 'easiest'] as const

export type CocktailSortOrder = (typeof COCKTAIL_SORT_ORDERS)[number]

export const COCKTAIL_SORT_LABELS: Readonly<Record<CocktailSortOrder, string>> = {
  name: 'Name (A–Z)',
  quickest: 'Quickest first',
  easiest: 'Easiest first',
}

export interface CocktailFilters {
  query: string
  bases: LiquorCategory[]
  methods: PreparationMethod[]
  difficulties: DifficultyLevel[]
  flavors: FlavorProfile[]
  sort: CocktailSortOrder
}

export const DEFAULT_COCKTAIL_FILTERS: CocktailFilters = {
  query: '',
  bases: [],
  methods: [],
  difficulties: [],
  flavors: [],
  sort: 'name',
}

const PARAM_KEYS = {
  query: 'q',
  bases: 'base',
  methods: 'method',
  difficulties: 'difficulty',
  flavors: 'flavor',
  sort: 'sort',
} as const

export function parseCocktailFilters(params: URLSearchParams): CocktailFilters {
  return {
    query: readString(params, PARAM_KEYS.query),
    bases: readEnumList(params, PARAM_KEYS.bases, LIQUOR_CATEGORIES),
    methods: readEnumList(params, PARAM_KEYS.methods, PREPARATION_METHODS),
    difficulties: readEnumList(params, PARAM_KEYS.difficulties, DIFFICULTY_LEVELS),
    flavors: readEnumList(params, PARAM_KEYS.flavors, FLAVOR_PROFILES),
    sort: readEnum(params, PARAM_KEYS.sort, COCKTAIL_SORT_ORDERS, DEFAULT_COCKTAIL_FILTERS.sort),
  }
}

export function toCocktailSearchParams(filters: CocktailFilters): URLSearchParams {
  const params = new URLSearchParams()
  writeString(params, PARAM_KEYS.query, filters.query)
  writeList(params, PARAM_KEYS.bases, filters.bases)
  writeList(params, PARAM_KEYS.methods, filters.methods)
  writeList(params, PARAM_KEYS.difficulties, filters.difficulties)
  writeList(params, PARAM_KEYS.flavors, filters.flavors)
  writeEnum(params, PARAM_KEYS.sort, filters.sort, DEFAULT_COCKTAIL_FILTERS.sort)
  return params
}

/** Number of panel filters in use (search and sort are not counted). */
export function countActiveCocktailFilters(filters: CocktailFilters): number {
  return (
    filters.bases.length +
    filters.methods.length +
    filters.difficulties.length +
    filters.flavors.length
  )
}

function matchesAny<T>(selected: readonly T[], value: T): boolean {
  return selected.length === 0 || selected.includes(value)
}

function matchesFilters(cocktail: Cocktail, filters: CocktailFilters): boolean {
  return (
    matchesAny(filters.bases, cocktail.baseCategory) &&
    matchesAny(filters.methods, cocktail.method) &&
    matchesAny(filters.difficulties, cocktail.difficulty) &&
    (filters.flavors.length === 0 ||
      filters.flavors.some((flavor) => cocktail.flavors.includes(flavor))) &&
    matchesQuery(
      [cocktail.name, cocktail.tagline, ...cocktail.ingredients.map((ingredient) => ingredient.name)],
      filters.query,
    )
  )
}

const byName = (first: Cocktail, second: Cocktail) => compareText(first.name, second.name)

const SORTERS: Readonly<Record<CocktailSortOrder, (first: Cocktail, second: Cocktail) => number>> = {
  name: byName,
  quickest: (first, second) => first.prepMinutes - second.prepMinutes || byName(first, second),
  easiest: (first, second) =>
    DIFFICULTY_LEVELS.indexOf(first.difficulty) - DIFFICULTY_LEVELS.indexOf(second.difficulty) ||
    byName(first, second),
}

/**
 * Options inside one group are combined with OR (gin or rum); different
 * groups are combined with AND (gin and shaken).
 */
export function applyCocktailFilters(
  cocktails: readonly Cocktail[],
  filters: CocktailFilters,
): Cocktail[] {
  return cocktails.filter((cocktail) => matchesFilters(cocktail, filters)).sort(SORTERS[filters.sort])
}
