import type { ReactNode } from 'react'
import { Badge, MediaCard } from '../../../../shared/components/index.ts'
import { paths } from '../../../../shared/config/routes.ts'
import { LIQUOR_CATEGORY_LABELS, type Liquor } from '../../model/liquor.ts'
import { BottleIllustration } from '../BottleIllustration/index.ts'

interface LiquorCardProps {
  liquor: Liquor
  action?: ReactNode
}

export function LiquorCard({ liquor, action }: LiquorCardProps) {
  return (
    <MediaCard
      to={paths.liquor(liquor.id)}
      title={liquor.name}
      color={liquor.color}
      media={<BottleIllustration color={liquor.color} />}
      eyebrow={<Badge tone="accent">{LIQUOR_CATEGORY_LABELS[liquor.category]}</Badge>}
      meta={`${liquor.abv}% ABV · ${liquor.origin}`}
      description={liquor.flavorNotes.join(' · ')}
      action={action}
    />
  )
}
