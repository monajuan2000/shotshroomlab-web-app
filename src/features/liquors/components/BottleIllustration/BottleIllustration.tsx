import styles from './BottleIllustration.module.css'

interface BottleIllustrationProps {
  color: string
  size?: number
}

export function BottleIllustration({ color, size = 96 }: BottleIllustrationProps) {
  return (
    <svg
      className={styles.bottle}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M25.5 30h13v26c0 1-1 2.5-2.5 2.5h-8c-1.5 0-2.5-1.5-2.5-2.5Z"
        fill={color}
      />
      <rect className={styles.label} x="26.5" y="37" width="11" height="11" rx="1.5" />
      <path
        d="M24 22c0-4 4-6 4-10V6h8v6c0 4 4 6 4 10v34c0 2-2 4-4 4h-8c-2 0-4-2-4-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M27 9h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
