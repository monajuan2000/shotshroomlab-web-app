import { useMessages } from '../../i18n/hooks.ts'
import { loadingStateMessages } from './LoadingState.messages.ts'
import styles from './LoadingState.module.css'

interface LoadingStateProps {
  label?: string
}

export function LoadingState({ label }: LoadingStateProps) {
  const messages = useMessages(loadingStateMessages)

  return (
    <div className={styles.state} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label ?? messages.label}</span>
    </div>
  )
}
