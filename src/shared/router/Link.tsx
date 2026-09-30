import type { AnchorHTMLAttributes } from 'react'
import { toHref } from './location.ts'

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
}

export function Link({ to, ...anchorProps }: LinkProps) {
  return <a href={toHref(to)} {...anchorProps} />
}
