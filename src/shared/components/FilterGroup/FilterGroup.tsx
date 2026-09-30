import type { Option } from '../../lib/options.ts'
import { Chip } from '../Chip/index.ts'
import styles from './FilterGroup.module.css'

interface FilterGroupProps<T extends string> {
  legend: string
  options: readonly Option<T>[]
  selected: readonly T[]
  onChange: (selected: T[]) => void
}

/** A multi-select group of chips. */
export function FilterGroup<T extends string>({
  legend,
  options,
  selected,
  onChange,
}: FilterGroupProps<T>) {
  function toggle(value: T) {
    onChange(
      selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value],
    )
  }

  if (options.length === 0) return null

  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.options}>
        {options.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            selected={selected.includes(option.value)}
            onToggle={() => toggle(option.value)}
          />
        ))}
      </div>
    </fieldset>
  )
}
