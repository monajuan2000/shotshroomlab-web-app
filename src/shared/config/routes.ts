export const ROUTE_PATTERNS = {
  home: '/',
  cocktails: '/cocktails',
  cocktail: '/cocktails/:cocktailId',
  liquors: '/liquors',
  liquor: '/liquors/:liquorId',
  favorites: '/favorites',
  notFound: '*',
} as const

function withQuery(pathname: string, searchParams?: URLSearchParams): string {
  const query = searchParams?.toString()
  return query ? `${pathname}?${query}` : pathname
}

export const paths = {
  home: () => ROUTE_PATTERNS.home,
  cocktails: (searchParams?: URLSearchParams) => withQuery(ROUTE_PATTERNS.cocktails, searchParams),
  cocktail: (cocktailId: string) => `${ROUTE_PATTERNS.cocktails}/${encodeURIComponent(cocktailId)}`,
  liquors: (searchParams?: URLSearchParams) => withQuery(ROUTE_PATTERNS.liquors, searchParams),
  liquor: (liquorId: string) => `${ROUTE_PATTERNS.liquors}/${encodeURIComponent(liquorId)}`,
  favorites: () => ROUTE_PATTERNS.favorites,
} as const
