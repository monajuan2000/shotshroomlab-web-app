import {
  AsyncView,
  Badge,
  ButtonLink,
  DetailHero,
  EmptyState,
  FactList,
  Icon,
  Section,
} from '../../shared/components/index.ts'
import { paths } from '../../shared/config/routes.ts'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle.ts'
import { useParams } from '../../shared/router/index.ts'
import { findCocktailsWithLiquor, useCocktails } from '../../features/cocktails/index.ts'
import { FavoriteButton } from '../../features/favorites/index.ts'
import {
  BottleIllustration,
  LIQUOR_CATEGORY_LABELS,
  useLiquor,
  type Liquor,
} from '../../features/liquors/index.ts'
import { CocktailGrid } from '../../widgets/CocktailGrid/index.ts'
import styles from './LiquorDetailPage.module.css'

function getFacts(liquor: Liquor) {
  return [
    { label: 'Category', value: LIQUOR_CATEGORY_LABELS[liquor.category] },
    { label: 'Strength', value: `${liquor.abv}% ABV` },
    { label: 'Origin', value: liquor.origin },
  ]
}

export function LiquorDetailPage() {
  const { liquorId } = useParams()
  const liquor = useLiquor(liquorId)
  const cocktails = useCocktails()

  useDocumentTitle(
    liquor.status === 'success' ? (liquor.data?.name ?? 'Spirit not found') : 'Spirit',
  )

  return (
    <>
      <div className={styles.back}>
        <ButtonLink to={paths.liquors()} variant="ghost" size="sm">
          <Icon name="arrowLeft" size={16} />
          All spirits
        </ButtonLink>
      </div>
      <AsyncView result={liquor} loadingLabel="Loading spirit…">
        {(found) =>
          found ? (
            <article className={styles.page}>
              <DetailHero
                title={found.name}
                color={found.color}
                media={<BottleIllustration color={found.color} size={200} />}
                eyebrow={found.flavorNotes.map((note) => (
                  <Badge key={note} tone="accent">
                    {note}
                  </Badge>
                ))}
                actions={
                  <FavoriteButton kind="liquor" id={found.id} itemName={found.name} appearance="full" />
                }
              >
                <p className={styles.description}>{found.description}</p>
                <FactList facts={getFacts(found)} />
              </DetailHero>

              <Section title="How to enjoy it">
                <ul className={styles.suggestions}>
                  {found.servingSuggestions.map((suggestion) => (
                    <li key={suggestion}>{suggestion}</li>
                  ))}
                </ul>
              </Section>

              <AsyncView result={cocktails} loadingLabel="Loading cocktails…">
                {(allCocktails) => {
                  const featuring = findCocktailsWithLiquor(allCocktails, found.id)
                  return featuring.length > 0 ? (
                    <Section title={`Cocktails with ${found.name}`}>
                      <CocktailGrid cocktails={featuring} />
                    </Section>
                  ) : null
                }}
              </AsyncView>
            </article>
          ) : (
            <EmptyState
              title="Spirit not found"
              description="This spirit does not exist or may have been removed."
              actions={<ButtonLink to={paths.liquors()}>Browse spirits</ButtonLink>}
            />
          )
        }
      </AsyncView>
    </>
  )
}
