import type { ReactNode } from 'react'
import styles from './CatalogLayout.module.css'

interface CatalogLayoutProps {
  filters: ReactNode
  toolbar: ReactNode
  summary: ReactNode
  children: ReactNode
}

/** Listing layout: filters on the side (stacked on small screens) and results. */
export function CatalogLayout({ filters, toolbar, summary, children }: CatalogLayoutProps) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>{filters}</aside>
      <div className={styles.main}>
        <div className={styles.toolbar}>{toolbar}</div>
        <p className={styles.summary} aria-live="polite">
          {summary}
        </p>
        {children}
      </div>
    </div>
  )
}
