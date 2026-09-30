import { Icon } from '../../shared/components/index.ts'
import { paths } from '../../shared/config/routes.ts'
import { useMessages } from '../../shared/i18n/index.ts'
import { Link, NavLink } from '../../shared/router/index.ts'
import { useFavorites } from '../../features/favorites/index.ts'
import { LanguageToggle } from '../../features/preferences/index.ts'
import { siteHeaderMessages } from './SiteHeader.messages.ts'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const { totalCount } = useFavorites()
  const messages = useMessages(siteHeaderMessages)

  const navItems = [
    { label: messages.home, to: paths.home(), end: true },
    { label: messages.cocktails, to: paths.cocktails(), end: false },
    { label: messages.spirits, to: paths.liquors(), end: false },
  ]

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
        <nav className={styles.nav} aria-label={messages.navLabel}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end} className={styles.navLink}>
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to={paths.favorites()} className={styles.navLink}>
                <Icon name="heart" size={16} />
                {messages.favorites}
                {totalCount > 0 && (
                  <span className={styles.count}>
                    {totalCount}
                    <span className="visually-hidden">{messages.savedSuffix}</span>
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.tools}>
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}
