import { Link, type LinkProps } from './Link.tsx'
import { useLocation } from './hooks.ts'
import { isPathActive } from './location.ts'

export interface NavLinkProps extends LinkProps {
  /** Only mark as active on an exact match, not on nested paths. */
  end?: boolean
}

/** A link that sets aria-current="page" when active; style it with that attribute. */
export function NavLink({ to, end = false, ...linkProps }: NavLinkProps) {
  const { pathname } = useLocation()
  const isActive = isPathActive(pathname, to, end)

  return <Link to={to} aria-current={isActive ? 'page' : undefined} {...linkProps} />
}
