import type { Locale, Localized } from '../../../shared/i18n/locales.ts'
import { formatNumber, roundToStep } from '../../../shared/lib/number.ts'
import { pluralize } from '../../../shared/lib/text.ts'
import { ML_PER_US_FLUID_OUNCE, type UnitSystem } from '../../../shared/lib/units.ts'
import type { CountUnit, IngredientMeasure } from './cocktail.ts'

type UnitName = { singular: string; plural: string }

const COUNT_UNIT_NAMES: Localized<Record<CountUnit, UnitName>> = {
  en: {
    dash: { singular: 'dash', plural: 'dashes' },
    barspoon: { singular: 'barspoon', plural: 'barspoons' },
    leaf: { singular: 'leaf', plural: 'leaves' },
    piece: { singular: 'piece', plural: 'pieces' },
    wedge: { singular: 'wedge', plural: 'wedges' },
    pinch: { singular: 'pinch', plural: 'pinches' },
  },
  es: {
    dash: { singular: 'golpe', plural: 'golpes' },
    barspoon: { singular: 'cucharita de bar', plural: 'cucharitas de bar' },
    leaf: { singular: 'hoja', plural: 'hojas' },
    piece: { singular: 'pieza', plural: 'piezas' },
    wedge: { singular: 'gajo', plural: 'gajos' },
    pinch: { singular: 'pizca', plural: 'pizcas' },
  },
}

const OUNCE_STEP = 0.25
const MILLILITER_STEP = 2.5

function formatVolume(totalMl: number, unitSystem: UnitSystem, locale: Locale): string {
  if (unitSystem === 'oz') {
    const ounces = Math.max(roundToStep(totalMl / ML_PER_US_FLUID_OUNCE, OUNCE_STEP), OUNCE_STEP)
    return `${formatNumber(ounces, locale)} oz`
  }
  const milliliters = Math.max(roundToStep(totalMl, MILLILITER_STEP), MILLILITER_STEP)
  return `${formatNumber(milliliters, locale)} ml`
}

/** Human readable amount, scaled to the number of servings. */
export function formatMeasure(
  measure: IngredientMeasure,
  unitSystem: UnitSystem,
  servings = 1,
  locale: Locale = 'en',
): string {
  switch (measure.kind) {
    case 'volume':
      return formatVolume(measure.ml * servings, unitSystem, locale)
    case 'count': {
      const total = measure.value * servings
      const names = COUNT_UNIT_NAMES[locale][measure.unit]
      return `${formatNumber(total, locale)} ${pluralize(total, names.singular, names.plural)}`
    }
    case 'to-taste':
      return measure.note
  }
}
