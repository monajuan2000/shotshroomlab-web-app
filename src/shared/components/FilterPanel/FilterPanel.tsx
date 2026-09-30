import { useId, useState, type ReactNode } from 'react'
import { cx } from '../../lib/classNames.ts'
import { Button } from '../Button/index.ts'
import { Icon } from '../Icon/index.ts'
import styles from './FilterPanel.module.css'

interface FilterPanelProps {
  activeCount: number
  onReset: () => void
  children: ReactNode
}

/** Filter container: collapsible on small screens, always open on wide screens. */
export function FilterPanel({ activeCount, onReset, children }: FilterPanelProps) {
  const bodyId = useId()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={styles.panel} aria-label="Filters">
      <div className={styles.header}>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls={bodyId}
          onClick={() => setIsOpen((current) => !current)}
        >
          <Icon name="sliders" size={18} />
          Filters
          {activeCount > 0 && <span className={styles.count}>{activeCount}</span>}
        </button>
        <h2 className={styles.title}>Filters</h2>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            Clear all
          </Button>
        )}
      </div>
      <div id={bodyId} className={cx(styles.body, isOpen && styles.open)}>
        {children}
      </div>
    </section>
  )
}
