import type { ComponentType, LazyExoticComponent } from 'react'
import { RouteParamsContext } from './RouterContext.ts'
import { useLocation } from './hooks.ts'
import { findRoute } from './location.ts'

export interface RouteDefinition {
  path: string
  component: ComponentType | LazyExoticComponent<ComponentType>
}

interface RoutesProps {
  routes: readonly RouteDefinition[]
}

export function Routes({ routes }: RoutesProps) {
  const { pathname } = useLocation()
  const match = findRoute(routes, pathname)
  if (!match) return null

  const Page = match.route.component
  // Keyed by pathname so page state resets when moving between detail pages.
  return (
    <RouteParamsContext value={match.params}>
      <Page key={pathname} />
    </RouteParamsContext>
  )
}
