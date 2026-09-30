import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { LIQUORS } from '../../src/features/liquors/data/liquors.ts'
import {
  DEFAULT_LIQUOR_FILTERS,
  applyLiquorFilters,
  parseLiquorFilters,
  toLiquorSearchParams,
  type LiquorFilters,
} from '../../src/features/liquors/model/index.ts'

function filtersWith(patch: Partial<LiquorFilters>): LiquorFilters {
  return { ...DEFAULT_LIQUOR_FILTERS, ...patch }
}

describe('liquor filters', () => {
  it('survives a round trip through the URL', () => {
    const filters = filtersWith({ query: 'smoke', categories: ['mezcal', 'whiskey'], sort: 'abv-desc' })
    assert.deepEqual(parseLiquorFilters(toLiquorSearchParams(filters)), filters)
  })

  it('filters by category', () => {
    const result = applyLiquorFilters(LIQUORS, filtersWith({ categories: ['rum'] }))
    assert.deepEqual(
      result.map((liquor) => liquor.id),
      ['dark-rum', 'white-rum'],
    )
  })

  it('searches flavor notes and origin', () => {
    assert.ok(applyLiquorFilters(LIQUORS, filtersWith({ query: 'juniper' })).some((l) => l.id === 'london-dry-gin'))
    assert.ok(applyLiquorFilters(LIQUORS, filtersWith({ query: 'scotland' })).every((l) => l.origin === 'Scotland'))
  })

  it('sorts by strength', () => {
    const strongestFirst = applyLiquorFilters(LIQUORS, filtersWith({ sort: 'abv-desc' }))
    for (let index = 1; index < strongestFirst.length; index += 1) {
      assert.ok(strongestFirst[index - 1].abv >= strongestFirst[index].abv)
    }
  })
})
