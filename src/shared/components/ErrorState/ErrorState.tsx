import { Button } from '../Button/index.ts'
import { EmptyState } from '../EmptyState/index.ts'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We could not load this content. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <EmptyState
      role="alert"
      icon="alert"
      title={title}
      description={description}
      actions={onRetry && <Button onClick={onRetry}>Try again</Button>}
    />
  )
}
