import { Icon } from '../../../../shared/components/index.ts'
import { LOCALES, useLocale, type Locale } from '../../../../shared/i18n/index.ts'
import { SWITCH_TO_LABELS } from './LanguageToggle.messages.ts'
import styles from './LanguageToggle.module.css'

function getNextLocale(locale: Locale): Locale {
  return LOCALES[(LOCALES.indexOf(locale) + 1) % LOCALES.length]
}

/** Switches every view to the next language. Only the UI changes; URLs and data ids stay the same. */
export function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const nextLocale = getNextLocale(locale)
  const label = SWITCH_TO_LABELS[nextLocale]

  return (
    <button
      type="button"
      className={styles.toggle}
      lang={nextLocale}
      aria-label={label}
      title={label}
      onClick={() => setLocale(nextLocale)}
    >
      <Icon name="globe" size={16} />
      <span className={styles.code} aria-hidden="true">
        {nextLocale}
      </span>
    </button>
  )
}
