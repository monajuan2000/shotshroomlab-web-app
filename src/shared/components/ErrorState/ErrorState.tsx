import { useMessages } from '../../i18n/hooks.ts'
import { Button } from '../Button/index.ts'
import { EmptyState } from '../EmptyState/index.ts'
import { errorStateMessages } from './ErrorState.messages.ts'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  const messages = useMessages(errorStateMessages)

  return (
    <EmptyState
      role="alert"
      icon="alert"
      title={title ?? messages.title}
      description={description ?? messages.description}
      actions={onRetry && <Button onClick={onRetry}>{messages.retry}</Button>}
    />
  )
}
