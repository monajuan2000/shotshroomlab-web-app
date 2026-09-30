import {
  AsyncView,
  ButtonLink,
  EmptyState,
  PageHeader,
  Section,
} from '../../shared/components/index.ts'
import { paths } from '../../shared/config/routes.ts'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle.ts'
import { useMessages } from '../../shared/i18n/index.ts'
import { pickByIds } from '../../shared/lib/collections.ts'
import { useCocktails } from '../../features/cocktails/index.ts'
import { useFavorites } from '../../features/favorites/index.ts'
import { useLiquors } from '../../features/liquors/index.ts'
import { CocktailGrid } from '../../widgets/CocktailGrid/index.ts'
import { LiquorGrid } from '../../widgets/LiquorGrid/index.ts'
import { favoritesPageMessages } from './FavoritesPage.messages.ts'
import styles from './FavoritesPage.module.css'

export function FavoritesPage() {
  const messages = useMessages(favoritesPageMessages)
  useDocumentTitle(messages.documentTitle)
  const { favorites, totalCount } = useFavorites()
  const cocktails = useCocktails()
  const liquors = useLiquors()

  return (
    <>
      <PageHeader
        eyebrow={messages.eyebrow}
        title={messages.title}
        description={messages.description}
      />
      {totalCount === 0 ? (
        <EmptyState
          icon="heart"
          title={messages.emptyTitle}
          description={messages.emptyDescription}
          actions={
            <>
              <ButtonLink to={paths.cocktails()}>{messages.browseCocktails}</ButtonLink>
              <ButtonLink to={paths.liquors()} variant="secondary">
                {messages.browseSpirits}
              </ButtonLink>
            </>
          }
        />
      ) : (
        <div className={styles.page}>
          {favorites.cocktail.length > 0 && (
            <AsyncView result={cocktails} loadingLabel={messages.loadingCocktails}>
              {(allCocktails) => (
                <Section title={messages.cocktails}>
                  <CocktailGrid cocktails={pickByIds(allCocktails, favorites.cocktail)} />
                </Section>
              )}
            </AsyncView>
          )}
          {favorites.liquor.length > 0 && (
            <AsyncView result={liquors} loadingLabel={messages.loadingSpirits}>
              {(allLiquors) => (
                <Section title={messages.spirits}>
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
