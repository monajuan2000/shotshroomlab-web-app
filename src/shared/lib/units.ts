export const UNIT_SYSTEMS = ['ml', 'oz'] as const

export type UnitSystem = (typeof UNIT_SYSTEMS)[number]

export const UNIT_SYSTEM_LABELS: Readonly<Record<UnitSystem, string>> = {
  ml: 'ml',
  oz: 'oz',
}

export const ML_PER_US_FLUID_OUNCE = 29.5735
