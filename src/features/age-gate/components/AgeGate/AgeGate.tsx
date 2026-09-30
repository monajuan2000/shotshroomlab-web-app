import { useId, useState, type ReactNode } from 'react'
import { Button, Icon } from '../../../../shared/components/index.ts'
import { APP_CONFIG } from '../../../../shared/config/appConfig.ts'
import { usePersistentState } from '../../../../shared/hooks/usePersistentState.ts'
import { useMessages } from '../../../../shared/i18n/index.ts'
import { isBoolean } from '../../../../shared/lib/guards.ts'
import { ageGateMessages } from './AgeGate.messages.ts'
import styles from './AgeGate.module.css'

interface AgeGateProps {
  children: ReactNode
  /** Controls shown in the corner of the dialog, such as a language switch. */
  toolbar?: ReactNode
}

/** Shows the app only after the visitor confirms they are of legal drinking age. */
export function AgeGate({ children, toolbar }: AgeGateProps) {
  const titleId = useId()
  const messages = useMessages(ageGateMessages)
  const [isVerified, setIsVerified] = usePersistentState(
    APP_CONFIG.storageKeys.ageVerification,
    false,
    isBoolean,
  )
  const [isDenied, setIsDenied] = useState(false)

  if (isVerified) return children

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        {toolbar && <div className={styles.toolbar}>{toolbar}</div>}
        <span className={styles.icon}>
          <Icon name="glass" size={30} />
        </span>
        {isDenied ? (
          <>
            <h1 id={titleId} className={styles.title}>
              {messages.deniedTitle}
            </h1>
            <p className={styles.description}>{messages.deniedDescription(APP_CONFIG.name)}</p>
            <Button variant="ghost" onClick={() => setIsDenied(false)}>
              {messages.goBack}
            </Button>
          </>
        ) : (
          <>
            <h1 id={titleId} className={styles.title}>
              {messages.welcome(APP_CONFIG.name)}
            </h1>
            <p className={styles.description}>{messages.question}</p>
            <div className={styles.actions}>
              <Button onClick={() => setIsVerified(true)} autoFocus>
                {messages.confirm}
              </Button>
              <Button variant="secondary" onClick={() => setIsDenied(true)}>
                {messages.deny}
              </Button>
            </div>
            <p className={styles.note}>{messages.note}</p>
          </>
        )}
      </div>
    </div>
  )
}
