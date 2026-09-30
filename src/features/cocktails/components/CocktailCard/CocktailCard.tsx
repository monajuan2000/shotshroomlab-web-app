import type { ReactNode } from 'react'
import { Badge, MediaCard } from '../../../../shared/components/index.ts'
import { paths } from '../../../../shared/config/routes.ts'
import { LIQUOR_CATEGORY_LABELS } from '../../../liquors/model/index.ts'
import {
  DIFFICULTY_LEVEL_LABELS,
  PREPARATION_METHOD_LABELS,
  type Cocktail,
} from '../../model/cocktail.ts'
import { GlassIllustration } from '../GlassIllustration/index.ts'

interface CocktailCardProps {
  cocktail: Cocktail
  action?: ReactNode
}

export function CocktailCard({ cocktail, action }: CocktailCardProps) {
  return (
    <MediaCard
      to={paths.cocktail(cocktail.id)}
      title={cocktail.name}
      color={cocktail.color}
      media={<GlassIllustration glass={cocktail.glass} color={cocktail.color} />}
      eyebrow={
        <>
          <Badge tone="accent">{LIQUOR_CATEGORY_LABELS[cocktail.baseCategory]}</Badge>
          <Badge>{DIFFICULTY_LEVEL_LABELS[cocktail.difficulty]}</Badge>
        </>
      }
      meta={`${PREPARATION_METHOD_LABELS[cocktail.method]} · ${cocktail.prepMinutes} min`}
      description={cocktail.tagline}
      action={action}
    />
  )
}
