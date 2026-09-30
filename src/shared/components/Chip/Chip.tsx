import styles from './Chip.module.css'

interface ChipProps {
  label: string
  selected: boolean
  onToggle: () => void
}

/** A toggle button used for filter options. */
export function Chip({ label, selected, onToggle }: ChipProps) {
  return (
    <button type="button" className={styles.chip} aria-pressed={selected} onClick={onToggle}>
      {label}
    </button>
  )
}
