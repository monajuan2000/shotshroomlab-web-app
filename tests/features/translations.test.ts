import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { cocktailRepository } from '../../src/features/cocktails/api/cocktailRepository.ts'
import { COCKTAILS } from '../../src/features/cocktails/data/cocktails.ts'
import {
  DEFAULT_COCKTAIL_FILTERS,
  applyCocktailFilters,
  translateCocktail,
} from '../../src/features/cocktails/model/index.ts'
import { liquorRepository } from '../../src/features/liquors/api/liquorRepository.ts'
import { LIQUORS } from '../../src/features/liquors/data/liquors.ts'
import { formatAbv, translateLiquor } from '../../src/features/liquors/model/index.ts'

const margarita = COCKTAILS.find((cocktail) => cocktail.id === 'margarita')
const vodka = LIQUORS.find((liquor) => liquor.id === 'vodka')

describe('translateCocktail', () => {
  it('replaces texts and keeps ids, measures and links', () => {
    assert.ok(margarita)
    const translated = translateCocktail(margarita, {
      cocktails: { margarita: { tagline: 'T', description: 'D', steps: ['S'] } },
      terms: { 'Fresh lime juice': 'Jugo de limón fresco', 'For the rim': 'Para el borde' },
    })

    assert.equal(translated.id, 'margarita')
    assert.equal(translated.name, 'Margarita')
    assert.equal(translated.tagline, 'T')
    assert.deepEqual(translated.steps, ['S'])
    assert.equal(translated.garnish, margarita.garnish)

    const lime = translated.ingredients.find((ingredient) => ingredient.name === 'Jugo de limón fresco')
    assert.deepEqual(lime?.measure, { kind: 'volume', ml: 25 })
    const salt = translated.ingredients.find((ingredient) => ingredient.measure.kind === 'to-taste')
    assert.deepEqual(salt?.measure, { kind: 'to-taste', note: 'Para el borde' })
    assert.equal(translated.ingredients[0].liquorId, 'blanco-tequila')
  })

  it('keeps English for anything that is not translated', () => {
    assert.ok(margarita)
    assert.deepEqual(translateCocktail(margarita, { cocktails: {}, terms: {} }), margarita)
  })
})

describe('translateLiquor', () => {
  it('keeps the English name when the translation does not set one', () => {
    assert.ok(vodka)
    const translated = translateLiquor(vodka, {
      vodka: { origin: 'O', description: 'D', flavorNotes: ['F'], servingSuggestions: ['S'] },
    })
    assert.equal(translated.name, 'Vodka')
    assert.equal(translated.origin, 'O')
    assert.equal(translated.abv, vodka.abv)
  })

  it('formats the strength per locale', () => {
    assert.equal(formatAbv(40, 'en'), '40% ABV')
    assert.equal(formatAbv(40, 'es'), '40% vol.')
  })
})

describe('localized repositories', () => {
  it('returns the English source catalog for English', async () => {
    assert.equal(await cocktailRepository.getAll('en'), COCKTAILS)
    assert.equal(await liquorRepository.getAll('en'), LIQUORS)
  })

  it('returns Spanish texts with the same ids and order', async () => {
    const cocktails = await cocktailRepository.getAll('es')
    assert.deepEqual(
      cocktails.map((cocktail) => cocktail.id),
      COCKTAILS.map((cocktail) => cocktail.id),
    )
    const whiteRussian = await cocktailRepository.getById('white-russian', 'es')
    assert.equal(whiteRussian?.name, 'Ruso Blanco')
    const rum = await liquorRepository.getById('white-rum', 'es')
    assert.equal(rum?.name, 'Ron Blanco')
  })

  it('lets people search in Spanish', async () => {
    const cocktails = await cocktailRepository.getAll('es')
    const result = applyCocktailFilters(cocktails, { ...DEFAULT_COCKTAIL_FILTERS, query: 'jengibre' })
    assert.deepEqual(
      result.map((cocktail) => cocktail.id),
      ['moscow-mule'],
    )
  })
})
