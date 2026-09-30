import { useEffect, useId, useRef, useState } from 'react'
import { useMessages } from '../../i18n/hooks.ts'
import { Icon } from '../Icon/index.ts'
import { searchInputMessages } from './SearchInput.messages.ts'
import styles from './SearchInput.module.css'

interface SearchInputProps {
  label: string
  placeholder?: string
  initialValue?: string
  delayMs?: number
  /** Called after the user stops typing for `delayMs`, or right away on clear. */
  onSearch: (query: string) => void
}

/**
 * Search box that owns its text and reports it with a debounce.
 * Change its `key` to reset the text from the outside.
 */
export function SearchInput({
  label,
  placeholder,
  initialValue = '',
  delayMs = 250,
  onSearch,
}: SearchInputProps) {
  const inputId = useId()
  const messages = useMessages(searchInputMessages)
  const [value, setValue] = useState(initialValue)
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  function report(nextValue: string, immediately: boolean) {
    window.clearTimeout(timeoutRef.current)
    if (immediately) {
      onSearch(nextValue)
    } else {
      timeoutRef.current = window.setTimeout(() => onSearch(nextValue), delayMs)
    }
  }

  function handleChange(nextValue: string) {
    setValue(nextValue)
    report(nextValue, false)
  }

  function handleClear() {
    setValue('')
    report('', true)
  }

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className="visually-hidden">
        {label}
      </label>
      <Icon name="search" size={18} className={styles.icon} />
      <input
        id={inputId}
        className={styles.input}
        type="search"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        onChange={(event) => handleChange(event.target.value)}
      />
      {value && (
        <button type="button" className={styles.clear} aria-label={messages.clear} onClick={handleClear}>
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  )
}
