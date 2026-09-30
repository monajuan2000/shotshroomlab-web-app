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
import { useLocale, useMessages, type Locale } from '../../shared/i18n/index.ts'
import { useParams } from '../../shared/router/index.ts'
import { findCocktailsWithLiquor, useCocktails } from '../../features/cocktails/index.ts'
import { FavoriteButton } from '../../features/favorites/index.ts'
import {
  BottleIllustration,
  LIQUOR_CATEGORY_LABELS,
  formatAbv,
  useLiquor,
  type Liquor,
} from '../../features/liquors/index.ts'
import { CocktailGrid } from '../../widgets/CocktailGrid/index.ts'
import { liquorDetailPageMessages } from './LiquorDetailPage.messages.ts'
import styles from './LiquorDetailPage.module.css'

type FactLabels = (typeof liquorDetailPageMessages)[Locale]['facts']

function getFacts(liquor: Liquor, locale: Locale, labels: FactLabels) {
  return [
    { label: labels.category, value: LIQUOR_CATEGORY_LABELS[locale][liquor.category] },
    { label: labels.strength, value: formatAbv(liquor.abv, locale) },
    { label: labels.origin, value: liquor.origin },
  ]
}

export function LiquorDetailPage() {
  const { liquorId } = useParams()
  const liquor = useLiquor(liquorId)
  const cocktails = useCocktails()
  const { locale } = useLocale()
  const messages = useMessages(liquorDetailPageMessages)

  useDocumentTitle(
    liquor.status === 'success' ? (liquor.data?.name ?? messages.notFoundTitle) : messages.documentTitle,
  )

  return (
    <>
      <div className={styles.back}>
        <ButtonLink to={paths.liquors()} variant="ghost" size="sm">
          <Icon name="arrowLeft" size={16} />
          {messages.allSpirits}
        </ButtonLink>
      </div>
      <AsyncView result={liquor} loadingLabel={messages.loadingSpirit}>
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
                <FactList facts={getFacts(found, locale, messages.facts)} />
              </DetailHero>

              <Section title={messages.howToEnjoy}>
                <ul className={styles.suggestions}>
                  {found.servingSuggestions.map((suggestion) => (
                    <li key={suggestion}>{suggestion}</li>
                  ))}
                </ul>
              </Section>

              <AsyncView result={cocktails} loadingLabel={messages.loadingCocktails}>
                {(allCocktails) => {
                  const featuring = findCocktailsWithLiquor(allCocktails, found.id)
                  return featuring.length > 0 ? (
                    <Section title={messages.cocktailsWith(found.name)}>
                      <CocktailGrid cocktails={featuring} />
                    </Section>
                  ) : null
                }}
              </AsyncView>
            </article>
          ) : (
            <EmptyState
              title={messages.notFoundTitle}
              description={messages.notFoundDescription}
              actions={<ButtonLink to={paths.liquors()}>{messages.browseSpirits}</ButtonLink>}
            />
          )
        }
      </AsyncView>
    </>
  )
}
