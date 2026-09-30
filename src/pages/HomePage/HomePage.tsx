import { AsyncView, ButtonLink, Icon, Section } from '../../shared/components/index.ts'
import { paths } from '../../shared/config/routes.ts'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle.ts'
import { useMessages } from '../../shared/i18n/index.ts'
import { BaseSpiritTiles, GlassIllustration, useCocktails } from '../../features/cocktails/index.ts'
import { useLiquors } from '../../features/liquors/index.ts'
import { CocktailGrid } from '../../widgets/CocktailGrid/index.ts'
import { LiquorGrid } from '../../widgets/LiquorGrid/index.ts'
import { homePageMessages } from './HomePage.messages.ts'
import styles from './HomePage.module.css'

const SPIRIT_PREVIEW_COUNT = 4

export function HomePage() {
  useDocumentTitle()
  const messages = useMessages(homePageMessages)
  const cocktails = useCocktails()
  const liquors = useLiquors()

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>{messages.eyebrow}</p>
          <h1 id="home-title" className={styles.title}>
            {messages.titleStart}
            <span className={styles.titleAccent}>{messages.titleAccent}</span>
          </h1>
          <p className={styles.lead}>{messages.lead}</p>
          <div className={styles.actions}>
            <ButtonLink to={paths.cocktails()}>
              {messages.browseCocktails}
              <Icon name="arrowRight" size={18} />
            </ButtonLink>
            <ButtonLink to={paths.liquors()} variant="secondary">
              {messages.discoverSpirits}
            </ButtonLink>
          </div>
        </div>
        <div className={styles.showcase} aria-hidden="true">
          <GlassIllustration glass="coupe" color="#d9e37a" size={110} />
          <GlassIllustration glass="highball" color="#e8c77a" size={150} />
          <GlassIllustration glass="rocks" color="#c0282d" size={110} />
        </div>
      </section>

      <AsyncView result={cocktails} loadingLabel={messages.loadingCocktails}>
        {(allCocktails) => (
          <>
            <Section
              title={messages.featuredTitle}
              description={messages.featuredDescription}
              actions={
                <ButtonLink to={paths.cocktails()} variant="ghost" size="sm">
                  {messages.viewAll}
                </ButtonLink>
              }
            >
              <CocktailGrid cocktails={allCocktails.filter((cocktail) => cocktail.isFeatured)} />
            </Section>
            <Section
              title={messages.bySpiritTitle}
              description={messages.bySpiritDescription}
            >
              <BaseSpiritTiles cocktails={allCocktails} />
            </Section>
          </>
        )}
      </AsyncView>

      <AsyncView result={liquors} loadingLabel={messages.loadingSpirits}>
        {(allLiquors) => (
          <Section
            title={messages.spiritsTitle}
            description={messages.spiritsDescription}
            actions={
              <ButtonLink to={paths.liquors()} variant="ghost" size="sm">
                {messages.allSpirits(allLiquors.length)}
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
