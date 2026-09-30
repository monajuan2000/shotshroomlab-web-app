import { AsyncView, ButtonLink, Icon, Section } from '../../shared/components/index.ts'
import { paths } from '../../shared/config/routes.ts'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle.ts'
import { BaseSpiritTiles, GlassIllustration, useCocktails } from '../../features/cocktails/index.ts'
import { useLiquors } from '../../features/liquors/index.ts'
import { CocktailGrid } from '../../widgets/CocktailGrid/index.ts'
import { LiquorGrid } from '../../widgets/LiquorGrid/index.ts'
import styles from './HomePage.module.css'

const SPIRIT_PREVIEW_COUNT = 4

export function HomePage() {
  useDocumentTitle()
  const cocktails = useCocktails()
  const liquors = useLiquors()

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Cocktail lab</p>
          <h1 id="home-title" className={styles.title}>
            Mix better drinks, <span className={styles.titleAccent}>one pour at a time.</span>
          </h1>
          <p className={styles.lead}>
            Explore classic cocktails with clear recipes, get to know the spirits behind them and
            save the ones you love.
          </p>
          <div className={styles.actions}>
            <ButtonLink to={paths.cocktails()}>
              Browse cocktails
              <Icon name="arrowRight" size={18} />
            </ButtonLink>
            <ButtonLink to={paths.liquors()} variant="secondary">
              Discover spirits
            </ButtonLink>
          </div>
        </div>
        <div className={styles.showcase} aria-hidden="true">
          <GlassIllustration glass="coupe" color="#d9e37a" size={110} />
          <GlassIllustration glass="highball" color="#e8c77a" size={150} />
          <GlassIllustration glass="rocks" color="#c0282d" size={110} />
        </div>
      </section>

      <AsyncView result={cocktails} loadingLabel="Loading cocktails…">
        {(allCocktails) => (
          <>
            <Section
              title="Featured cocktails"
              description="Timeless recipes every home bartender should know."
              actions={
                <ButtonLink to={paths.cocktails()} variant="ghost" size="sm">
                  View all
                </ButtonLink>
              }
            >
              <CocktailGrid cocktails={allCocktails.filter((cocktail) => cocktail.isFeatured)} />
            </Section>
            <Section
              title="Explore by spirit"
              description="Pick a base spirit and see what you can mix with it."
            >
              <BaseSpiritTiles cocktails={allCocktails} />
            </Section>
          </>
        )}
      </AsyncView>

      <AsyncView result={liquors} loadingLabel="Loading spirits…">
        {(allLiquors) => (
          <Section
            title="Know your spirits"
            description="Flavor notes, strength and serving ideas for every bottle on the shelf."
            actions={
              <ButtonLink to={paths.liquors()} variant="ghost" size="sm">
                All {allLiquors.length} spirits
              </ButtonLink>
            }
          >
            <LiquorGrid liquors={allLiquors.slice(0, SPIRIT_PREVIEW_COUNT)} />
          </Section>
        )}
      </AsyncView>
    </div>
  )
}
