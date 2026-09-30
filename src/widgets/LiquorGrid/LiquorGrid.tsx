import { CardGrid } from '../../shared/components/index.ts'
import { FavoriteButton } from '../../features/favorites/index.ts'
import { LiquorCard, type Liquor } from '../../features/liquors/index.ts'

interface LiquorGridProps {
  liquors: readonly Liquor[]
}

export function LiquorGrid({ liquors }: LiquorGridProps) {
  return (
    <CardGrid
      items={liquors}
      getKey={(liquor) => liquor.id}
      renderItem={(liquor) => (
        <LiquorCard
          liquor={liquor}
          action={<FavoriteButton kind="liquor" id={liquor.id} itemName={liquor.name} />}
        />
      )}
    />
  )
}
