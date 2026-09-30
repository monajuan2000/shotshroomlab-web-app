import { APP_CONFIG } from '../../shared/config/appConfig.ts'
import { useMessages } from '../../shared/i18n/index.ts'
import { siteFooterMessages } from './SiteFooter.messages.ts'
import styles from './SiteFooter.module.css'

const CURRENT_YEAR = new Date().getFullYear()

export function SiteFooter() {
  const messages = useMessages(siteFooterMessages)

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.notice}>{messages.notice}</p>
        <p>
          © {CURRENT_YEAR} {APP_CONFIG.name}
        </p>
      </div>
    </footer>
  )
}
