import { formatNumber, roundToStep } from '../../../shared/lib/number.ts'
import { pluralize } from '../../../shared/lib/text.ts'
import { ML_PER_US_FLUID_OUNCE, type UnitSystem } from '../../../shared/lib/units.ts'
import type { CountUnit, IngredientMeasure } from './cocktail.ts'

const COUNT_UNIT_NAMES: Readonly<Record<CountUnit, { singular: string; plural: string }>> = {
  dash: { singular: 'dash', plural: 'dashes' },
  barspoon: { singular: 'barspoon', plural: 'barspoons' },
  leaf: { singular: 'leaf', plural: 'leaves' },
  piece: { singular: 'piece', plural: 'pieces' },
  wedge: { singular: 'wedge', plural: 'wedges' },
  pinch: { singular: 'pinch', plural: 'pinches' },
}

const OUNCE_STEP = 0.25
const MILLILITER_STEP = 2.5

function formatVolume(totalMl: number, unitSystem: UnitSystem): string {
  if (unitSystem === 'oz') {
    const ounces = Math.max(roundToStep(totalMl / ML_PER_US_FLUID_OUNCE, OUNCE_STEP), OUNCE_STEP)
    return `${formatNumber(ounces)} oz`
  }
  const milliliters = Math.max(roundToStep(totalMl, MILLILITER_STEP), MILLILITER_STEP)
  return `${formatNumber(milliliters)} ml`
}

/** Human readable amount, scaled to the number of servings. */
export function formatMeasure(
  measure: IngredientMeasure,
  unitSystem: UnitSystem,
  servings = 1,
): string {
  switch (measure.kind) {
    case 'volume':
      return formatVolume(measure.ml * servings, unitSystem)
    case 'count': {
      const total = measure.value * servings
      const names = COUNT_UNIT_NAMES[measure.unit]
      return `${formatNumber(total)} ${pluralize(total, names.singular, names.plural)}`
    }
    case 'to-taste':
      return measure.note
  }
}
