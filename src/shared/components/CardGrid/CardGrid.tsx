import type { CSSProperties, Key, ReactNode } from 'react'
import styles from './CardGrid.module.css'

interface CardGridProps<T> {
  items: readonly T[]
  getKey: (item: T) => Key
  renderItem: (item: T) => ReactNode
  /** Smallest width a card may shrink to before the grid drops a column. */
  minItemWidth?: number
}

/** Responsive list of cards; the number of columns adapts to the available width. */
export function CardGrid<T>({ items, getKey, renderItem, minItemWidth = 240 }: CardGridProps<T>) {
  const style = { '--card-min-width': `${minItemWidth}px` } as CSSProperties

  return (
    <ul className={styles.grid} style={style}>
      {items.map((item) => (
        <li key={getKey(item)} className={styles.item}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}
