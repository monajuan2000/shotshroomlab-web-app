import type { ReactNode } from 'react'
import { Badge, MediaCard } from '../../../../shared/components/index.ts'
import { paths } from '../../../../shared/config/routes.ts'
import { useLocale } from '../../../../shared/i18n/index.ts'
import { LIQUOR_CATEGORY_LABELS, formatAbv, type Liquor } from '../../model/liquor.ts'
import { BottleIllustration } from '../BottleIllustration/index.ts'

interface LiquorCardProps {
  liquor: Liquor
  action?: ReactNode
}

export function LiquorCard({ liquor, action }: LiquorCardProps) {
  const { locale } = useLocale()

  return (
    <MediaCard
      to={paths.liquor(liquor.id)}
      title={liquor.name}
      color={liquor.color}
      media={<BottleIllustration color={liquor.color} />}
      eyebrow={<Badge tone="accent">{LIQUOR_CATEGORY_LABELS[locale][liquor.category]}</Badge>}
      meta={`${formatAbv(liquor.abv, locale)} · ${liquor.origin}`}
      description={liquor.flavorNotes.join(' · ')}
      action={action}
    />
  )
}
