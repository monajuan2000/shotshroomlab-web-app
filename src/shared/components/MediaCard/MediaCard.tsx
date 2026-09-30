import type { CSSProperties, ReactNode } from 'react'
import { Link } from '../../router/index.ts'
import styles from './MediaCard.module.css'

interface MediaCardProps {
  to: string
  title: string
  media: ReactNode
  /** Tints the media background. */
  color: string
  eyebrow?: ReactNode
  meta?: ReactNode
  description?: string
  /** Extra control rendered above the card link, such as a favorite button. */
  action?: ReactNode
}

export function MediaCard({ to, title, media, color, eyebrow, meta, description, action }: MediaCardProps) {
  const mediaStyle = { '--media-color': color } as CSSProperties

  return (
    <article className={styles.card}>
      <div className={styles.media} style={mediaStyle}>
        {media}
      </div>
      <div className={styles.body}>
        {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
        <h3 className={styles.title}>
          <Link to={to} className={styles.link}>
            {title}
          </Link>
        </h3>
        {meta && <p className={styles.meta}>{meta}</p>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </article>
  )
}
