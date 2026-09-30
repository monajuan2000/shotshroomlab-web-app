import styles from './FactList.module.css'

export interface Fact {
  label: string
  value: string
}

interface FactListProps {
  facts: readonly Fact[]
}

/** Grid of short label and value pairs, such as "ABV: 40%". */
export function FactList({ facts }: FactListProps) {
  return (
    <dl className={styles.list}>
      {facts.map((fact) => (
        <div key={fact.label} className={styles.fact}>
          <dt className={styles.label}>{fact.label}</dt>
          <dd className={styles.value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
