import type { ButtonHTMLAttributes } from 'react'
import { buttonClassName, type ButtonAppearance } from './buttonClassName.ts'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonAppearance {}

export function Button({ variant, size, className, type = 'button', ...buttonProps }: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size }, className)}
      {...buttonProps}
    />
  )
}
