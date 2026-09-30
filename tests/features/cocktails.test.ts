import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { COCKTAILS } from '../../src/features/cocktails/data/cocktails.ts'
import {
  DEFAULT_COCKTAIL_FILTERS,
  applyCocktailFilters,
  countActiveCocktailFilters,
  findCocktailsWithLiquor,
  findRelatedCocktails,
  formatMeasure,
  parseCocktailFilters,
  toCocktailSearchParams,
  type Cocktail,
  type CocktailFilters,
} from '../../src/features/cocktails/model/index.ts'

function filtersWith(patch: Partial<CocktailFilters>): CocktailFilters {
  return { ...DEFAULT_COCKTAIL_FILTERS, ...patch }
}

function ids(cocktails: readonly Cocktail[]): string[] {
  return cocktails.map((cocktail) => cocktail.id)
}

describe('cocktail filters', () => {
  it('survives a round trip through the URL', () => {
    const filters = filtersWith({
      query: 'lime',
      bases: ['gin', 'rum'],
      flavors: ['citrus'],
      sort: 'quickest',
    })
    assert.deepEqual(parseCocktailFilters(toCocktailSearchParams(filters)), filters)
  })

  it('writes nothing for the default filters', () => {
    assert.equal(toCocktailSearchParams(DEFAULT_COCKTAIL_FILTERS).toString(), '')
  })

  it('ignores invalid values coming from the URL', () => {
    const filters = parseCocktailFilters(new URLSearchParams('base=beer&sort=random&method=shaken'))
    assert.deepEqual(filters, filtersWith({ methods: ['shaken'] }))
  })

  it('returns every cocktail, sorted by name, without filters', () => {
    const result = applyCocktailFilters(COCKTAILS, DEFAULT_COCKTAIL_FILTERS)
    assert.equal(result.length, COCKTAILS.length)
    assert.deepEqual(ids(result), ids([...result].sort((a, b) => a.name.localeCompare(b.name))))
  })

  it('combines options of one group with OR and groups with AND', () => {
    const result = applyCocktailFilters(
      COCKTAILS,
      filtersWith({ bases: ['gin', 'rum'], methods: ['stirred'] }),
    )
    assert.ok(result.length > 0)
    for (const cocktail of result) {
      assert.ok(['gin', 'rum'].includes(cocktail.baseCategory))
      assert.equal(cocktail.method, 'stirred')
    }
  })

  it('searches by ingredient name', () => {
    const result = applyCocktailFilters(COCKTAILS, filtersWith({ query: 'ginger beer' }))
    assert.deepEqual(ids(result), ['moscow-mule'])
  })

  it('does not mutate the source list', () => {
    const before = ids(COCKTAILS)
    applyCocktailFilters(COCKTAILS, filtersWith({ sort: 'quickest' }))
    assert.deepEqual(ids(COCKTAILS), before)
  })

  it('counts active panel filters, ignoring search and sort', () => {
    const filters = filtersWith({ query: 'x', sort: 'easiest', bases: ['gin'], flavors: ['sweet', 'bitter'] })
    assert.equal(countActiveCocktailFilters(filters), 3)
  })
})

describe('formatMeasure', () => {
  it('formats and scales volumes in milliliters', () => {
    assert.equal(formatMeasure({ kind: 'volume', ml: 22.5 }, 'ml'), '22.5 ml')
    assert.equal(formatMeasure({ kind: 'volume', ml: 25 }, 'ml', 3), '75 ml')
  })

  it('converts volumes to ounces rounded to a quarter', () => {
    assert.equal(formatMeasure({ kind: 'volume', ml: 60 }, 'oz'), '2 oz')
    assert.equal(formatMeasure({ kind: 'volume', ml: 22.5 }, 'oz'), '0.75 oz')
    assert.equal(formatMeasure({ kind: 'volume', ml: 2 }, 'oz'), '0.25 oz')
  })

  it('pluralizes counted units', () => {
    assert.equal(formatMeasure({ kind: 'count', value: 1, unit: 'leaf' }, 'ml'), '1 leaf')
    assert.equal(formatMeasure({ kind: 'count', value: 2, unit: 'dash' }, 'ml', 2), '4 dashes')
  })

  it('shows free text measures unchanged', () => {
    assert.equal(formatMeasure({ kind: 'to-taste', note: 'Top up' }, 'oz', 4), 'Top up')
  })
})

describe('cocktail queries', () => {
  const negroni = COCKTAILS.find((cocktail) => cocktail.id === 'negroni')

  it('finds related cocktails without including the cocktail itself', () => {
    assert.ok(negroni)
    const related = findRelatedCocktails(negroni, COCKTAILS, 3)
    assert.equal(related.length, 3)
    assert.ok(!ids(related).includes('negroni'))
    assert.equal(related[0].baseCategory, 'gin')
  })

  it('finds cocktails that use a given liquor', () => {
    const withMezcal = findCocktailsWithLiquor(COCKTAILS, 'mezcal')
    assert.deepEqual(ids(withMezcal), ['oaxaca-old-fashioned'])
  })
})
