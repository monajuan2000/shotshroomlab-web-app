import { useCallback, useMemo } from 'react'
import { useSearchParams } from '../router/index.ts'

/**
 * Keeps a typed state object in the query string so filtered views can be
 * shared, bookmarked and restored with the back button.
 * `parse` and `serialize` must be stable (module level) functions.
 */
export function useUrlState<T extends object>(
  parse: (params: URLSearchParams) => T,
  serialize: (state: T) => URLSearchParams,
) {
  const [searchParams, setSearchParams] = useSearchParams()
  const state = useMemo(() => parse(searchParams), [parse, searchParams])

  const update = useCallback(
    (patch: Partial<T>) => {
      setSearchParams((current) => serialize({ ...parse(current), ...patch }))
    },
    [parse, serialize, setSearchParams],
  )

  const reset = useCallback(() => setSearchParams(new URLSearchParams()), [setSearchParams])

  return { state, update, reset }
}
