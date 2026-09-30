import { useId } from 'react'
import type { Option } from '../../lib/options.ts'
import styles from './SelectField.module.css'

interface SelectFieldProps<T extends string> {
  label: string
  value: T
  options: readonly Option<T>[]
  onChange: (value: T) => void
}

export function SelectField<T extends string>({ label, value, options, onChange }: SelectFieldProps<T>) {
  const selectId = useId()

  function handleChange(rawValue: string) {
    const option = options.find((item) => item.value === rawValue)
    if (option) onChange(option.value)
  }

  return (
    <div className={styles.field}>
      <label htmlFor={selectId}>{label}</label>
      <select
        id={selectId}
        className={styles.select}
        value={value}
        onChange={(event) => handleChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
