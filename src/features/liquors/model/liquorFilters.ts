import type { Localized } from '../../../shared/i18n/locales.ts'
import {
  readEnum,
  readEnumList,
  readString,
  writeEnum,
  writeList,
  writeString,
} from '../../../shared/lib/searchParams.ts'
import { compareText, matchesQuery } from '../../../shared/lib/text.ts'
import { LIQUOR_CATEGORIES, type Liquor, type LiquorCategory } from './liquor.ts'

export const LIQUOR_SORT_ORDERS = ['name', 'abv-desc', 'abv-asc'] as const

export type LiquorSortOrder = (typeof LIQUOR_SORT_ORDERS)[number]

export const LIQUOR_SORT_LABELS: Localized<Record<LiquorSortOrder, string>> = {
  en: {
    name: 'Name (A–Z)',
    'abv-desc': 'Strongest first',
    'abv-asc': 'Lightest first',
  },
  es: {
    name: 'Nombre (A–Z)',
    'abv-desc': 'Más fuertes primero',
    'abv-asc': 'Más suaves primero',
  },
}

export interface LiquorFilters {
  query: string
  categories: LiquorCategory[]
  sort: LiquorSortOrder
}

export const DEFAULT_LIQUOR_FILTERS: LiquorFilters = {
  query: '',
  categories: [],
  sort: 'name',
}

const PARAM_KEYS = {
  query: 'q',
  categories: 'category',
  sort: 'sort',
} as const

export function parseLiquorFilters(params: URLSearchParams): LiquorFilters {
  return {
    query: readString(params, PARAM_KEYS.query),
    categories: readEnumList(params, PARAM_KEYS.categories, LIQUOR_CATEGORIES),
    sort: readEnum(params, PARAM_KEYS.sort, LIQUOR_SORT_ORDERS, DEFAULT_LIQUOR_FILTERS.sort),
  }
}

export function toLiquorSearchParams(filters: LiquorFilters): URLSearchParams {
  const params = new URLSearchParams()
  writeString(params, PARAM_KEYS.query, filters.query)
  writeList(params, PARAM_KEYS.categories, filters.categories)
  writeEnum(params, PARAM_KEYS.sort, filters.sort, DEFAULT_LIQUOR_FILTERS.sort)
  return params
}

/** Number of panel filters in use (search and sort are not counted). */
export function countActiveLiquorFilters(filters: LiquorFilters): number {
  return filters.categories.length
}

const SORTERS: Readonly<Record<LiquorSortOrder, (first: Liquor, second: Liquor) => number>> = {
  name: (first, second) => compareText(first.name, second.name),
  'abv-desc': (first, second) => second.abv - first.abv || compareText(first.name, second.name),
  'abv-asc': (first, second) => first.abv - second.abv || compareText(first.name, second.name),
}

export function applyLiquorFilters(liquors: readonly Liquor[], filters: LiquorFilters): Liquor[] {
  return liquors
    .filter(
      (liquor) =>
        (filters.categories.length === 0 || filters.categories.includes(liquor.category)) &&
        matchesQuery(
          [liquor.name, liquor.origin, liquor.category, ...liquor.flavorNotes],
          filters.query,
        ),
    )
    .sort(SORTERS[filters.sort])
}
