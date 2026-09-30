import { Link, type LinkProps } from '../../router/index.ts'
import { buttonClassName, type ButtonAppearance } from './buttonClassName.ts'

export interface ButtonLinkProps extends LinkProps, ButtonAppearance {}

/** A navigation link styled as a button. */
export function ButtonLink({ variant, size, className, ...linkProps }: ButtonLinkProps) {
  return <Link className={buttonClassName({ variant, size }, className)} {...linkProps} />
}
