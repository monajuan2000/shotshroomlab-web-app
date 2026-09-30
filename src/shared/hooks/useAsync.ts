import { useCallback, useEffect, useState } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

export type AsyncResult<T> = AsyncState<T> & { retry: () => void }

interface SettledState<T> {
  load: () => Promise<T>
  attempt: number
  state: AsyncState<T>
}

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error))
}

/**
 * Runs `load` and tracks its result. Pass a stable function (module level or
 * wrapped in useCallback): a new function reference triggers a new request.
 */
export function useAsync<T>(load: () => Promise<T>): AsyncResult<T> {
  const [attempt, setAttempt] = useState(0)
  const [settled, setSettled] = useState<SettledState<T> | null>(null)

  useEffect(() => {
    let isActive = true

    load().then(
      (data) => {
        if (isActive) setSettled({ load, attempt, state: { status: 'success', data } })
      },
      (error: unknown) => {
        if (isActive) setSettled({ load, attempt, state: { status: 'error', error: toError(error) } })
      },
    )

    return () => {
      isActive = false
    }
  }, [load, attempt])

  const retry = useCallback(() => setAttempt((current) => current + 1), [])

  // A result only counts if it belongs to the current request.
  const isCurrent = settled !== null && settled.load === load && settled.attempt === attempt
  const state: AsyncState<T> = isCurrent ? settled.state : { status: 'loading' }

  return { ...state, retry }
}
