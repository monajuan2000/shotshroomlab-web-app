import type { Option } from '../../lib/options.ts'
import styles from './SegmentedControl.module.css'

interface SegmentedControlProps<T extends string> {
  label: string
  value: T
  options: readonly Option<T>[]
  onChange: (value: T) => void
}

/** A single-choice toggle for a small set of options. */
export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className={styles.control} role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          className={styles.option}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
