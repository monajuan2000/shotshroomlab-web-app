import { APP_CONFIG } from '../../shared/config/appConfig.ts'
import styles from './SiteFooter.module.css'

const CURRENT_YEAR = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.notice}>
          Please drink responsibly. Content intended for adults of legal drinking age. Never drink
          and drive.
        </p>
        <p>
          © {CURRENT_YEAR} {APP_CONFIG.name}
        </p>
      </div>
    </footer>
  )
}
