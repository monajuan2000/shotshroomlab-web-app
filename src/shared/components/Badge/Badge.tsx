import type { ReactNode } from 'react'
import { cx } from '../../lib/classNames.ts'
import styles from './Badge.module.css'

interface BadgeProps {
  children: ReactNode
  tone?: 'neutral' | 'accent'
}

export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  return <span className={cx(styles.badge, styles[tone])}>{children}</span>
}
