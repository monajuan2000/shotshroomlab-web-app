import type { ReactNode } from 'react'
import { Icon, type IconName } from '../Icon/index.ts'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: IconName
  actions?: ReactNode
  role?: 'status' | 'alert'
}

export function EmptyState({ title, description, icon = 'glass', actions, role }: EmptyStateProps) {
  return (
    <div className={styles.state} role={role}>
      <span className={styles.icon}>
        <Icon name={icon} size={26} />
      </span>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
