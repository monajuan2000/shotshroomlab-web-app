export interface Option<T extends string> {
  value: T
  label: string
}

export function toOptions<T extends string>(
  values: readonly T[],
  labels: Readonly<Record<T, string>>,
): Option<T>[] {
  return values.map((value) => ({ value, label: labels[value] }))
}

/** Keeps the canonical order of `values` but only those present in `used`. */
export function pickUsedValues<T extends string>(values: readonly T[], used: Iterable<T>): T[] {
  const usedSet = new Set(used)
  return values.filter((value) => usedSet.has(value))
}
