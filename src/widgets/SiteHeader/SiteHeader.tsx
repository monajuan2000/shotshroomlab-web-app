import { Icon } from '../../shared/components/index.ts'
import { paths } from '../../shared/config/routes.ts'
import { Link, NavLink } from '../../shared/router/index.ts'
import { useFavorites } from '../../features/favorites/index.ts'
import styles from './SiteHeader.module.css'

const NAV_ITEMS = [
  { label: 'Home', to: paths.home(), end: true },
  { label: 'Cocktails', to: paths.cocktails(), end: false },
  { label: 'Spirits', to: paths.liquors(), end: false },
] as const

export function SiteHeader() {
  const { totalCount } = useFavorites()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={paths.home()} className={styles.brand}>
          <span className={styles.brandMark}>
            <Icon name="glass" size={20} />
          </span>
          <span>
            ShotShroom <span className={styles.brandAccent}>Lab</span>
          </span>
        </Link>
        <nav className={styles.nav} aria-label="Main">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={styles.navLink}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to={paths.favorites()} className={styles.navLink}>
                <Icon name="heart" size={16} />
                Favorites
                {totalCount > 0 && (
                  <span className={styles.count}>
                    {totalCount}
                    <span className="visually-hidden"> saved</span>
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
