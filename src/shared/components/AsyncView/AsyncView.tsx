import type { ReactNode } from 'react'
import type { AsyncResult } from '../../hooks/useAsync.ts'
import { ErrorState } from '../ErrorState/index.ts'
import { LoadingState } from '../LoadingState/index.ts'

interface AsyncViewProps<T> {
  result: AsyncResult<T>
  loadingLabel?: string
  children: (data: T) => ReactNode
}

/** Renders loading and error states so pages only describe the success case. */
export function AsyncView<T>({ result, loadingLabel, children }: AsyncViewProps<T>) {
  switch (result.status) {
    case 'loading':
      return <LoadingState label={loadingLabel} />
    case 'error':
      return <ErrorState onRetry={result.retry} />
    case 'success':
      return children(result.data)
  }
}
