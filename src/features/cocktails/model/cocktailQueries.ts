import { compareText } from '../../../shared/lib/text.ts'
import type { Cocktail } from './cocktail.ts'

const SCORE_SAME_BASE = 3
const SCORE_SAME_METHOD = 1
const SCORE_PER_SHARED_FLAVOR = 1

function similarityScore(target: Cocktail, candidate: Cocktail): number {
  const sharedFlavors = candidate.flavors.filter((flavor) => target.flavors.includes(flavor)).length
  return (
    (candidate.baseCategory === target.baseCategory ? SCORE_SAME_BASE : 0) +
    (candidate.method === target.method ? SCORE_SAME_METHOD : 0) +
    sharedFlavors * SCORE_PER_SHARED_FLAVOR
  )
}

/** Most similar cocktails by base spirit, method and flavor. */
export function findRelatedCocktails(
  target: Cocktail,
  cocktails: readonly Cocktail[],
  limit = 3,
): Cocktail[] {
  return cocktails
    .filter((candidate) => candidate.id !== target.id)
    .map((candidate) => ({ candidate, score: similarityScore(target, candidate) }))
    .filter(({ score }) => score > 0)
    .sort((first, second) => second.score - first.score || compareText(first.candidate.name, second.candidate.name))
    .slice(0, limit)
    .map(({ candidate }) => candidate)
}

export function findCocktailsWithLiquor(cocktails: readonly Cocktail[], liquorId: string): Cocktail[] {
  return cocktails.filter((cocktail) =>
    cocktail.ingredients.some((ingredient) => ingredient.liquorId === liquorId),
  )
}
