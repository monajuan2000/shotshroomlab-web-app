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
import styles from './CocktailDetailPage.module.css'

const MIN_SERVINGS = 1
const MAX_SERVINGS = 12

function getFacts(cocktail: Cocktail) {
  return [
    { label: 'Base spirit', value: LIQUOR_CATEGORY_LABELS[cocktail.baseCategory] },
    { label: 'Method', value: PREPARATION_METHOD_LABELS[cocktail.method] },
    { label: 'Glass', value: GLASS_TYPE_LABELS[cocktail.glass] },
    { label: 'Difficulty', value: DIFFICULTY_LEVEL_LABELS[cocktail.difficulty] },
    { label: 'Prep time', value: `${cocktail.prepMinutes} min` },
    { label: 'Garnish', value: cocktail.garnish ?? 'None' },
  ]
}

export function CocktailDetailPage() {
  const { cocktailId } = useParams()
  const cocktail = useCocktail(cocktailId)
  const cocktails = useCocktails()
  const { unitSystem } = usePreferences()
  const [servings, setServings] = useState(MIN_SERVINGS)

  useDocumentTitle(
    cocktail.status === 'success' ? (cocktail.data?.name ?? 'Cocktail not found') : 'Cocktail',
  )

  return (
    <>
      <div className={styles.back}>
        <ButtonLink to={paths.cocktails()} variant="ghost" size="sm">
          <Icon name="arrowLeft" size={16} />
          All cocktails
        </ButtonLink>
      </div>
      <AsyncView result={cocktail} loadingLabel="Loading recipe…">
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
                    {FLAVOR_PROFILE_LABELS[flavor]}
                  </Badge>
                ))}
                actions={
                  <FavoriteButton kind="cocktail" id={found.id} itemName={found.name} appearance="full" />
                }
              >
                <p className={styles.description}>{found.description}</p>
                <FactList facts={getFacts(found)} />
              </DetailHero>

              <div className={styles.recipe}>
                <section className={styles.panel} aria-labelledby="ingredients-title">
                  <div className={styles.panelHeader}>
                    <h2 id="ingredients-title" className={styles.panelTitle}>
                      Ingredients
                    </h2>
                    <div className={styles.panelControls}>
                      <NumberStepper
                        label="Servings"
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
                    Preparation
                  </h2>
                  <PreparationSteps steps={found.steps} />
                </section>
              </div>

              <AsyncView result={cocktails} loadingLabel="Loading suggestions…">
                {(allCocktails) => {
                  const related = findRelatedCocktails(found, allCocktails)
                  return related.length > 0 ? (
                    <Section title="You might also like">
                      <CocktailGrid cocktails={related} />
                    </Section>
                  ) : null
                }}
              </AsyncView>
            </article>
          ) : (
            <EmptyState
              title="Cocktail not found"
              description="This recipe does not exist or may have been removed."
              actions={<ButtonLink to={paths.cocktails()}>Browse cocktails</ButtonLink>}
            />
          )
        }
      </AsyncView>
    </>
  )
}
