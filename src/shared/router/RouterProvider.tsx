import { useCallback, useMemo, useSyncExternalStore, type ReactNode } from 'react'
import { RouterContext, type NavigateOptions, type RouterContextValue } from './RouterContext.ts'
import { parseHashLocation, toHref } from './location.ts'

/*
 * Hash based routing ("#/cocktails") so the app works on static hosting such
 * as GitHub Pages without server rewrites.
 */

function subscribe(onChange: () => void): () => void {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getHash(): string {
  return window.location.hash
}

function getCurrentLocation() {
  return parseHashLocation(window.location.hash)
}

interface RouterProviderProps {
  children: ReactNode
}

export function RouterProvider({ children }: RouterProviderProps) {
  const hash = useSyncExternalStore(subscribe, getHash)
  const location = useMemo(() => parseHashLocation(hash), [hash])

  const navigate = useCallback((to: string, options: NavigateOptions = {}) => {
    const href = toHref(to)
    if (href === window.location.hash) return

    if (options.replace) {
      window.location.replace(href)
    } else {
      window.location.hash = href
    }
  }, [])

  const value = useMemo<RouterContextValue>(
    () => ({ location, navigate, getCurrentLocation }),
    [location, navigate],
  )

  return <RouterContext value={value}>{children}</RouterContext>
}
