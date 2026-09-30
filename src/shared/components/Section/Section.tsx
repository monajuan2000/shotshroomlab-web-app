import { useId, type ReactNode } from 'react'
import styles from './Section.module.css'

interface SectionProps {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

export function Section({ title, description, actions, children }: SectionProps) {
  const titleId = useId()

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {actions}
      </div>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </section>
  )
}
