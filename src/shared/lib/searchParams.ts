import { isOneOf } from './guards.ts'

const LIST_SEPARATOR = ','

export function readString(params: URLSearchParams, key: string): string {
  return params.get(key)?.trim() ?? ''
}

export function readEnum<T extends string>(
  params: URLSearchParams,
  key: string,
  allowed: readonly T[],
  fallback: T,
): T {
  const value = params.get(key)
  return isOneOf(allowed, value) ? value : fallback
}

/** Reads a comma separated list, dropping unknown and duplicated values. */
export function readEnumList<T extends string>(
  params: URLSearchParams,
  key: string,
  allowed: readonly T[],
): T[] {
  const raw = params.get(key)
  if (!raw) return []

  const values = raw.split(LIST_SEPARATOR).filter((value): value is T => isOneOf(allowed, value))
  return [...new Set(values)]
}

export function writeString(params: URLSearchParams, key: string, value: string): void {
  const trimmed = value.trim()
  if (trimmed) params.set(key, trimmed)
}

export function writeEnum<T extends string>(
  params: URLSearchParams,
  key: string,
  value: T,
  fallback: T,
): void {
  if (value !== fallback) params.set(key, value)
}

export function writeList(params: URLSearchParams, key: string, values: readonly string[]): void {
  if (values.length > 0) params.set(key, values.join(LIST_SEPARATOR))
}
