/** Lowercases and strips accents so "Añejo" matches "anejo". */
export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

/** True when every word of the query appears in at least one of the fields. */
export function matchesQuery(fields: readonly string[], query: string): boolean {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return true

  const normalizedFields = fields.map(normalizeText)
  return normalizedQuery
    .split(/\s+/)
    .every((term) => normalizedFields.some((field) => field.includes(term)))
}

export function compareText(first: string, second: string): number {
  return first.localeCompare(second, 'en', { sensitivity: 'base' })
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count === 1 ? singular : plural
}
