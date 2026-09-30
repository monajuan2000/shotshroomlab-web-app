import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { COCKTAILS } from '../../src/features/cocktails/data/cocktails.ts'
import {
  DIFFICULTY_LEVELS,
  FLAVOR_PROFILES,
  GLASS_TYPES,
  PREPARATION_METHODS,
} from '../../src/features/cocktails/model/index.ts'
import { LIQUORS } from '../../src/features/liquors/data/liquors.ts'
import { LIQUOR_CATEGORIES } from '../../src/features/liquors/model/index.ts'

// Guards the hand written catalogs so mistakes fail the build, not the UI.

const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i

function assertUniqueIds(items: readonly { id: string }[]) {
  const seen = new Set<string>()
  for (const { id } of items) {
    assert.ok(!seen.has(id), `Duplicated id "${id}"`)
    seen.add(id)
  }
}

function includes(values: readonly string[], value: string): boolean {
  return values.includes(value)
}

describe('liquor catalog', () => {
  it('has unique, URL friendly ids', () => {
    assertUniqueIds(LIQUORS)
    for (const liquor of LIQUORS) assert.match(liquor.id, ID_PATTERN)
  })

  it('has valid values for every liquor', () => {
    for (const liquor of LIQUORS) {
      assert.ok(includes(LIQUOR_CATEGORIES, liquor.category), `${liquor.id}: unknown category`)
      assert.ok(liquor.abv > 0 && liquor.abv < 100, `${liquor.id}: invalid ABV`)
      assert.match(liquor.color, HEX_COLOR_PATTERN, `${liquor.id}: invalid color`)
      assert.ok(liquor.flavorNotes.length > 0, `${liquor.id}: missing flavor notes`)
      assert.ok(liquor.servingSuggestions.length > 0, `${liquor.id}: missing serving suggestions`)
    }
  })
})

describe('cocktail catalog', () => {
  const liquorIds = new Set(LIQUORS.map((liquor) => liquor.id))

  it('has unique, URL friendly ids', () => {
    assertUniqueIds(COCKTAILS)
    for (const cocktail of COCKTAILS) assert.match(cocktail.id, ID_PATTERN)
  })

  it('has valid values for every cocktail', () => {
    for (const cocktail of COCKTAILS) {
      assert.ok(includes(LIQUOR_CATEGORIES, cocktail.baseCategory), `${cocktail.id}: unknown base`)
      assert.ok(includes(GLASS_TYPES, cocktail.glass), `${cocktail.id}: unknown glass`)
      assert.ok(includes(PREPARATION_METHODS, cocktail.method), `${cocktail.id}: unknown method`)
      assert.ok(includes(DIFFICULTY_LEVELS, cocktail.difficulty), `${cocktail.id}: unknown difficulty`)
      assert.ok(cocktail.flavors.length > 0, `${cocktail.id}: missing flavors`)
      for (const flavor of cocktail.flavors) {
        assert.ok(includes(FLAVOR_PROFILES, flavor), `${cocktail.id}: unknown flavor ${flavor}`)
      }
      assert.ok(cocktail.steps.length > 0, `${cocktail.id}: missing steps`)
      assert.ok(cocktail.prepMinutes > 0, `${cocktail.id}: invalid prep time`)
      assert.match(cocktail.color, HEX_COLOR_PATTERN, `${cocktail.id}: invalid color`)
    }
  })

  it('references only liquors that exist', () => {
    for (const cocktail of COCKTAILS) {
      for (const ingredient of cocktail.ingredients) {
        if (ingredient.liquorId) {
          assert.ok(
            liquorIds.has(ingredient.liquorId),
            `${cocktail.id}: unknown liquor "${ingredient.liquorId}"`,
          )
        }
      }
    }
  })

  it('uses unique ingredient names and steps inside each recipe', () => {
    // Names and steps are used as React keys.
    for (const cocktail of COCKTAILS) {
      const names = cocktail.ingredients.map((ingredient) => ingredient.name)
      assert.equal(new Set(names).size, names.length, `${cocktail.id}: duplicated ingredient`)
      assert.equal(new Set(cocktail.steps).size, cocktail.steps.length, `${cocktail.id}: duplicated step`)
    }
  })

  it('features at least one cocktail on the home page', () => {
    assert.ok(COCKTAILS.some((cocktail) => cocktail.isFeatured))
  })
})
