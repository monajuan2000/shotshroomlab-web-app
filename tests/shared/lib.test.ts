import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { countBy, pickByIds } from '../../src/shared/lib/collections.ts'
import { pickUsedValues, toOptions } from '../../src/shared/lib/options.ts'
import { readEnum, readEnumList, writeList } from '../../src/shared/lib/searchParams.ts'
import { matchesQuery, normalizeText, pluralize } from '../../src/shared/lib/text.ts'

describe('text', () => {
  it('normalizes case and accents', () => {
    assert.equal(normalizeText('  Añejo Café '), 'anejo cafe')
  })

  it('requires every word of the query to appear in some field', () => {
    assert.equal(matchesQuery(['Negroni', 'Gin'], 'gin negroni'), true)
    assert.equal(matchesQuery(['Negroni', 'Gin'], 'gin rum'), false)
    assert.equal(matchesQuery(['Negroni'], '   '), true)
  })

  it('pluralizes by count', () => {
    assert.equal(pluralize(1, 'cocktail'), 'cocktail')
    assert.equal(pluralize(2, 'leaf', 'leaves'), 'leaves')
  })
})

describe('searchParams', () => {
  const allowed = ['gin', 'rum', 'vodka'] as const

  it('reads lists, ignoring unknown and duplicated values', () => {
    const params = new URLSearchParams('base=gin,whatever,gin,rum')
    assert.deepEqual(readEnumList(params, 'base', allowed), ['gin', 'rum'])
  })

  it('falls back when an enum value is unknown', () => {
    const params = new URLSearchParams('sort=random')
    assert.equal(readEnum(params, 'sort', ['name', 'abv'] as const, 'name'), 'name')
  })

  it('does not write empty lists', () => {
    const params = new URLSearchParams()
    writeList(params, 'base', [])
    assert.equal(params.toString(), '')
  })
})

describe('options and collections', () => {
  it('builds options in the given order', () => {
    assert.deepEqual(toOptions(['b', 'a'] as const, { a: 'A', b: 'B' }), [
      { value: 'b', label: 'B' },
      { value: 'a', label: 'A' },
    ])
  })

  it('keeps canonical order when picking used values', () => {
    assert.deepEqual(pickUsedValues(['gin', 'rum', 'vodka'], ['vodka', 'gin']), ['gin', 'vodka'])
  })

  it('picks items by id in the order of the ids', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    assert.deepEqual(pickByIds(items, ['c', 'missing', 'a']), [{ id: 'c' }, { id: 'a' }])
  })

  it('counts items by key', () => {
    assert.deepEqual([...countBy(['a', 'b', 'a'], (item) => item)], [
      ['a', 2],
      ['b', 1],
    ])
  })
})
