import type { Cocktail, Ingredient } from './cocktail.ts'

/** Texts of one cocktail in another locale. Omitted optional fields keep the English value. */
export interface CocktailTranslation {
  name?: string
  tagline: string
  description: string
  steps: readonly string[]
  garnish?: string
}

/** Translations of the catalog for one locale. */
export interface CocktailCatalogTranslation {
  /** Keyed by cocktail id. */
  cocktails: Readonly<Record<string, CocktailTranslation>>
  /**
   * Ingredient names and "to taste" notes, keyed by their English text. They
   * repeat across many recipes, so each one is translated only once.
   */
  terms: Readonly<Record<string, string>>
}

function translateIngredient(ingredient: Ingredient, terms: CocktailCatalogTranslation['terms']): Ingredient {
  const { measure } = ingredient
  return {
    ...ingredient,
    name: terms[ingredient.name] ?? ingredient.name,
    measure: measure.kind === 'to-taste' ? { ...measure, note: terms[measure.note] ?? measure.note } : measure,
  }
}

/** Returns the cocktail with its texts replaced; anything untranslated stays in English. */
export function translateCocktail(cocktail: Cocktail, translation: CocktailCatalogTranslation): Cocktail {
  const texts = translation.cocktails[cocktail.id]
  const ingredients = cocktail.ingredients.map((ingredient) =>
    translateIngredient(ingredient, translation.terms),
  )
  if (!texts) return { ...cocktail, ingredients }

  return {
    ...cocktail,
    name: texts.name ?? cocktail.name,
    tagline: texts.tagline,
    description: texts.description,
    steps: texts.steps,
    garnish: texts.garnish ?? cocktail.garnish,
    ingredients,
  }
}
