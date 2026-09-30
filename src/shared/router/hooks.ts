import { useCallback, useContext, useMemo } from 'react'
import {
  RouteParamsContext,
  RouterContext,
  type NavigateOptions,
  type RouterContextValue,
} from './RouterContext.ts'

type SearchParamsUpdate = URLSearchParams | ((current: URLSearchParams) => URLSearchParams)

function useRouter(): RouterContextValue {
  const router = useContext(RouterContext)
  if (!router) throw new Error('Router hooks must be used inside <RouterProvider>.')
  return router
}

export function useLocation() {
  return useRouter().location
}

export function useNavigate() {
  return useRouter().navigate
}

export function useParams() {
  return useContext(RouteParamsContext)
}

/**
 * Query string state for the current page. Updates replace the history entry
 * by default so typing in a filter does not flood the back button.
 */
export function useSearchParams() {
  const { location, navigate, getCurrentLocation } = useRouter()
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])

  const setSearchParams = useCallback(
    (update: SearchParamsUpdate, options: NavigateOptions = { replace: true }) => {
      const current = getCurrentLocation()
      const next =
        typeof update === 'function' ? update(new URLSearchParams(current.search)) : update
      const query = next.toString()
      navigate(query ? `${current.pathname}?${query}` : current.pathname, options)
    },
    [getCurrentLocation, navigate],
  )

  return [searchParams, setSearchParams] as const
}
