import type { Locale } from '../i18n/locales.ts'

const numberFormatters = new Map<Locale, Intl.NumberFormat>()

function getNumberFormatter(locale: Locale): Intl.NumberFormat {
  let formatter = numberFormatters.get(locale)
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 })
    numberFormatters.set(locale, formatter)
  }
  return formatter
}

/** Uses the decimal separator of the locale: "0.75" in English, "0,75" in Spanish. */
export function formatNumber(value: number, locale: Locale = 'en'): string {
  return getNumberFormatter(locale).format(value)
}

export function roundToStep(value: number, step: number): number {
  return Math.round(value / step) * step
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
