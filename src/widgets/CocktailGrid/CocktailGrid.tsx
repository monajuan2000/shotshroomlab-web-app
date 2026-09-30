import { CardGrid } from '../../shared/components/index.ts'
import { CocktailCard, type Cocktail } from '../../features/cocktails/index.ts'
import { FavoriteButton } from '../../features/favorites/index.ts'

interface CocktailGridProps {
  cocktails: readonly Cocktail[]
}

export function CocktailGrid({ cocktails }: CocktailGridProps) {
  return (
    <CardGrid
      items={cocktails}
      getKey={(cocktail) => cocktail.id}
      renderItem={(cocktail) => (
        <CocktailCard
          cocktail={cocktail}
          action={<FavoriteButton kind="cocktail" id={cocktail.id} itemName={cocktail.name} />}
        />
      )}
    />
  )
}
