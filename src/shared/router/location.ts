export interface AppLocation {
  pathname: string
  search: string
}

export type RouteParams = Readonly<Record<string, string>>

export interface RouteMatch<T> {
  route: T
  params: RouteParams
}

export const WILDCARD_PATTERN = '*'

export function normalizePathname(pathname: string): string {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, '/')
  return collapsed.length > 1 && collapsed.endsWith('/') ? collapsed.slice(0, -1) : collapsed
}

/** Turns "#/cocktails?base=gin" (or "/cocktails?base=gin") into its parts. */
export function parseHashLocation(hash: string): AppLocation {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  const queryIndex = raw.indexOf('?')
  const pathname = queryIndex === -1 ? raw : raw.slice(0, queryIndex)
  const search = queryIndex === -1 ? '' : raw.slice(queryIndex)

  return {
    pathname: normalizePathname(pathname),
    search: search === '?' ? '' : search,
  }
}

export function toHref(to: string): string {
  const { pathname, search } = parseHashLocation(to)
  return `#${pathname}${search}`
}

function toSegments(path: string): string[] {
  return normalizePathname(path).split('/').filter(Boolean)
}

function safeDecode(value: string): string | null {
  try {
    return decodeURIComponent(value)
  } catch {
    return null
  }
}

/** Matches patterns such as "/cocktails/:cocktailId". Returns null when it does not match. */
export function matchPath(pattern: string, pathname: string): RouteParams | null {
  if (pattern === WILDCARD_PATTERN) return {}

  const patternSegments = toSegments(pattern)
  const pathSegments = toSegments(pathname)
  if (patternSegments.length !== pathSegments.length) return null

  const params: Record<string, string> = {}
  for (let index = 0; index < patternSegments.length; index += 1) {
    const expected = patternSegments[index]
    const actual = pathSegments[index]

    if (expected.startsWith(':')) {
      const value = safeDecode(actual)
      if (value === null) return null
      params[expected.slice(1)] = value
    } else if (expected !== actual) {
      return null
    }
  }
  return params
}

/** Returns the first route whose pattern matches, so declare the wildcard last. */
export function findRoute<T extends { path: string }>(
  routes: readonly T[],
  pathname: string,
): RouteMatch<T> | null {
  for (const route of routes) {
    const params = matchPath(route.path, pathname)
    if (params) return { route, params }
  }
  return null
}

export function isPathActive(pathname: string, target: string, exact: boolean): boolean {
  const current = normalizePathname(pathname)
  const expected = normalizePathname(target)

  if (exact || expected === '/') return current === expected
  return current === expected || current.startsWith(`${expected}/`)
}
