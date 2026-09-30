import { cx } from '../../lib/classNames.ts'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md'

export interface ButtonAppearance {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** Shared by <Button> and <ButtonLink> so both always look the same. */
export function buttonClassName(
  { variant = 'primary', size = 'md' }: ButtonAppearance,
  className?: string,
): string {
  return cx(styles.button, styles[variant], styles[size], className)
}
