import type { CSSProperties, ReactNode } from 'react'
import styles from './DetailHero.module.css'

interface DetailHeroProps {
  title: string
  media: ReactNode
  /** Tints the media background. */
  color: string
  eyebrow?: ReactNode
  tagline?: string
  actions?: ReactNode
  /** Extra content under the title, such as a fact list. */
  children?: ReactNode
}

export function DetailHero({ title, media, color, eyebrow, tagline, actions, children }: DetailHeroProps) {
  const mediaStyle = { '--media-color': color } as CSSProperties

  return (
    <header className={styles.hero}>
      <div className={styles.media} style={mediaStyle}>
        {media}
      </div>
      <div className={styles.content}>
        {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
        <h1 className={styles.title}>{title}</h1>
        {tagline && <p className={styles.tagline}>{tagline}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
        {children}
      </div>
    </header>
  )
}
