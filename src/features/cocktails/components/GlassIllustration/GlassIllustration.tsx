import type { GlassType } from '../../model/cocktail.ts'
import styles from './GlassIllustration.module.css'
import { GLASS_SHAPES } from './glassShapes.ts'

interface GlassIllustrationProps {
  glass: GlassType
  color: string
  size?: number
}

export function GlassIllustration({ glass, color, size = 96 }: GlassIllustrationProps) {
  const shape = GLASS_SHAPES[glass]

  return (
    <svg
      className={styles.glass}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <path className={styles.liquid} d={shape.liquid} fill={color} />
      <path
        d={shape.outline}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
