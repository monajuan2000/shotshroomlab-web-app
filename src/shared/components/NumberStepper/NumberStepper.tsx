import { useId } from 'react'
import { clamp } from '../../lib/number.ts'
import { Icon } from '../Icon/index.ts'
import styles from './NumberStepper.module.css'

interface NumberStepperProps {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}

export function NumberStepper({ label, value, min, max, onChange }: NumberStepperProps) {
  const labelId = useId()

  function change(delta: number) {
    onChange(clamp(value + delta, min, max))
  }

  return (
    <div className={styles.stepper} role="group" aria-labelledby={labelId}>
      <span id={labelId} className={styles.label}>
        {label}
      </span>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => change(-1)}
        >
          <Icon name="minus" size={16} />
        </button>
        <output className={styles.value} aria-live="polite">
          {value}
        </output>
        <button
          type="button"
          className={styles.button}
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => change(1)}
        >
          <Icon name="plus" size={16} />
        </button>
      </div>
    </div>
  )
}
