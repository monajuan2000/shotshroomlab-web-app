import {
  AsyncView,
  ButtonLink,
  EmptyState,
  PageHeader,
  Section,
} from '../../shared/components/index.ts'
import { paths } from '../../shared/config/routes.ts'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle.ts'
import { pickByIds } from '../../shared/lib/collections.ts'
import { useCocktails } from '../../features/cocktails/index.ts'
import { useFavorites } from '../../features/favorites/index.ts'
import { useLiquors } from '../../features/liquors/index.ts'
import { CocktailGrid } from '../../widgets/CocktailGrid/index.ts'
import { LiquorGrid } from '../../widgets/LiquorGrid/index.ts'
import styles from './FavoritesPage.module.css'

export function FavoritesPage() {
  useDocumentTitle('Favorites')
  const { favorites, totalCount } = useFavorites()
  const cocktails = useCocktails()
  const liquors = useLiquors()

  return (
    <>
      <PageHeader
        eyebrow="Your collection"
        title="Favorites"
        description="Cocktails and spirits you saved. They are stored on this device."
      />
      {totalCount === 0 ? (
        <EmptyState
          icon="heart"
          title="Nothing saved yet"
          description="Tap the heart on any cocktail or spirit to keep it here."
          actions={
            <>
              <ButtonLink to={paths.cocktails()}>Browse cocktails</ButtonLink>
              <ButtonLink to={paths.liquors()} variant="secondary">
                Browse spirits
              </ButtonLink>
            </>
          }
        />
      ) : (
        <div className={styles.page}>
          {favorites.cocktail.length > 0 && (
            <AsyncView result={cocktails} loadingLabel="Loading cocktails…">
              {(allCocktails) => (
                <Section title="Cocktails">
                  <CocktailGrid cocktails={pickByIds(allCocktails, favorites.cocktail)} />
                </Section>
              )}
            </AsyncView>
          )}
          {favorites.liquor.length > 0 && (
            <AsyncView result={liquors} loadingLabel="Loading spirits…">
              {(allLiquors) => (
                <Section title="Spirits">
                  <LiquorGrid liquors={pickByIds(allLiquors, favorites.liquor)} />
                </Section>
              )}
            </AsyncView>
          )}
        </div>
      )}
    </>
  )
}
