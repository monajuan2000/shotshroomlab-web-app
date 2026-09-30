import { useState } from 'react'
import {
  AsyncView,
  Badge,
  ButtonLink,
  DetailHero,
  EmptyState,
  FactList,
  Icon,
  NumberStepper,
  Section,
} from '../../shared/components/index.ts'
import { paths } from '../../shared/config/routes.ts'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle.ts'
import { useLocale, useMessages, type Locale } from '../../shared/i18n/index.ts'
import { useParams } from '../../shared/router/index.ts'
import {
  DIFFICULTY_LEVEL_LABELS,
  FLAVOR_PROFILE_LABELS,
  GLASS_TYPE_LABELS,
  GlassIllustration,
  IngredientList,
  PREPARATION_METHOD_LABELS,
  PreparationSteps,
  findRelatedCocktails,
  useCocktail,
  useCocktails,
  type Cocktail,
} from '../../features/cocktails/index.ts'
import { FavoriteButton } from '../../features/favorites/index.ts'
import { LIQUOR_CATEGORY_LABELS } from '../../features/liquors/index.ts'
import { UnitSystemToggle, usePreferences } from '../../features/preferences/index.ts'
import { CocktailGrid } from '../../widgets/CocktailGrid/index.ts'
import { cocktailDetailPageMessages } from './CocktailDetailPage.messages.ts'
import styles from './CocktailDetailPage.module.css'

const MIN_SERVINGS = 1
const MAX_SERVINGS = 12

type FactLabels = (typeof cocktailDetailPageMessages)[Locale]['facts']

function getFacts(cocktail: Cocktail, locale: Locale, labels: FactLabels) {
  return [
    { label: labels.base, value: LIQUOR_CATEGORY_LABELS[locale][cocktail.baseCategory] },
    { label: labels.method, value: PREPARATION_METHOD_LABELS[locale][cocktail.method] },
    { label: labels.glass, value: GLASS_TYPE_LABELS[locale][cocktail.glass] },
    { label: labels.difficulty, value: DIFFICULTY_LEVEL_LABELS[locale][cocktail.difficulty] },
    { label: labels.prepTime, value: `${cocktail.prepMinutes} min` },
    { label: labels.garnish, value: cocktail.garnish ?? labels.noGarnish },
  ]
}

export function CocktailDetailPage() {
  const { cocktailId } = useParams()
  const cocktail = useCocktail(cocktailId)
  const cocktails = useCocktails()
  const { unitSystem } = usePreferences()
  const { locale } = useLocale()
  const messages = useMessages(cocktailDetailPageMessages)
  const [servings, setServings] = useState(MIN_SERVINGS)

  useDocumentTitle(
    cocktail.status === 'success'
      ? (cocktail.data?.name ?? messages.notFoundTitle)
      : messages.documentTitle,
  )

  return (
    <>
      <div className={styles.back}>
        <ButtonLink to={paths.cocktails()} variant="ghost" size="sm">
          <Icon name="arrowLeft" size={16} />
          {messages.allCocktails}
        </ButtonLink>
      </div>
      <AsyncView result={cocktail} loadingLabel={messages.loadingRecipe}>
        {(found) =>
          found ? (
            <article className={styles.page}>
              <DetailHero
                title={found.name}
                tagline={found.tagline}
                color={found.color}
                media={<GlassIllustration glass={found.glass} color={found.color} size={200} />}
                eyebrow={found.flavors.map((flavor) => (
                  <Badge key={flavor} tone="accent">
                    {FLAVOR_PROFILE_LABELS[locale][flavor]}
                  </Badge>
                ))}
                actions={
                  <FavoriteButton kind="cocktail" id={found.id} itemName={found.name} appearance="full" />
                }
              >
                <p className={styles.description}>{found.description}</p>
                <FactList facts={getFacts(found, locale, messages.facts)} />
              </DetailHero>

              <div className={styles.recipe}>
                <section className={styles.panel} aria-labelledby="ingredients-title">
                  <div className={styles.panelHeader}>
                    <h2 id="ingredients-title" className={styles.panelTitle}>
                      {messages.ingredients}
                    </h2>
                    <div className={styles.panelControls}>
                      <NumberStepper
                        label={messages.servings}
                        value={servings}
                        min={MIN_SERVINGS}
                        max={MAX_SERVINGS}
                        onChange={setServings}
                      />
                      <UnitSystemToggle />
                    </div>
                  </div>
                  <IngredientList
                    ingredients={found.ingredients}
                    unitSystem={unitSystem}
                    servings={servings}
                  />
                </section>
                <section className={styles.panel} aria-labelledby="steps-title">
                  <h2 id="steps-title" className={styles.panelTitle}>
                    {messages.preparation}
                  </h2>
                  <PreparationSteps steps={found.steps} />
                </section>
              </div>

              <AsyncView result={cocktails} loadingLabel={messages.loadingSuggestions}>
                {(allCocktails) => {
                  const related = findRelatedCocktails(found, allCocktails)
                  return related.length > 0 ? (
                    <Section title={messages.related}>
                      <CocktailGrid cocktails={related} />
                    </Section>
                  ) : null
                }}
              </AsyncView>
            </article>
          ) : (
            <EmptyState
              title={messages.notFoundTitle}
              description={messages.notFoundDescription}
              actions={<ButtonLink to={paths.cocktails()}>{messages.browseCocktails}</ButtonLink>}
            />
          )
        }
      </AsyncView>
    </>
  )
}
