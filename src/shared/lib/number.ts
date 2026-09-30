const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })

export function formatNumber(value: number): string {
  return numberFormatter.format(value)
}

export function roundToStep(value: number, step: number): number {
  return Math.round(value / step) * step
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
