import styles from './PreparationSteps.module.css'

interface PreparationStepsProps {
  steps: readonly string[]
}

export function PreparationSteps({ steps }: PreparationStepsProps) {
  return (
    <ol className={styles.steps}>
      {steps.map((step) => (
        <li key={step} className={styles.step}>
          <p className={styles.text}>{step}</p>
        </li>
      ))}
    </ol>
  )
}
