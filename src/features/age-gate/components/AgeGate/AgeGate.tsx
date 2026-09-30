import { useId, useState, type ReactNode } from 'react'
import { Button, Icon } from '../../../../shared/components/index.ts'
import { APP_CONFIG } from '../../../../shared/config/appConfig.ts'
import { usePersistentState } from '../../../../shared/hooks/usePersistentState.ts'
import { isBoolean } from '../../../../shared/lib/guards.ts'
import styles from './AgeGate.module.css'

interface AgeGateProps {
  children: ReactNode
}

/** Shows the app only after the visitor confirms they are of legal drinking age. */
export function AgeGate({ children }: AgeGateProps) {
  const titleId = useId()
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
        <span className={styles.icon}>
          <Icon name="glass" size={30} />
        </span>
        {isDenied ? (
          <>
            <h1 id={titleId} className={styles.title}>
              See you later
            </h1>
            <p className={styles.description}>
              {APP_CONFIG.name} is only available to people of legal drinking age. Please come back
              when you are.
            </p>
            <Button variant="ghost" onClick={() => setIsDenied(false)}>
              Go back
            </Button>
          </>
        ) : (
          <>
            <h1 id={titleId} className={styles.title}>
              Welcome to {APP_CONFIG.name}
            </h1>
            <p className={styles.description}>
              Are you of legal drinking age in your country?
            </p>
            <div className={styles.actions}>
              <Button onClick={() => setIsVerified(true)} autoFocus>
                Yes, I am
              </Button>
              <Button variant="secondary" onClick={() => setIsDenied(true)}>
                No, I am not
              </Button>
            </div>
            <p className={styles.note}>Please enjoy responsibly.</p>
          </>
        )}
      </div>
    </div>
  )
}
