import { paths } from '../../../../shared/config/routes.ts'
import { countBy } from '../../../../shared/lib/collections.ts'
import { pickUsedValues } from '../../../../shared/lib/options.ts'
import { pluralize } from '../../../../shared/lib/text.ts'
import { Link } from '../../../../shared/router/index.ts'
import { LIQUOR_CATEGORIES, LIQUOR_CATEGORY_LABELS } from '../../../liquors/model/index.ts'
import type { Cocktail } from '../../model/cocktail.ts'
import { DEFAULT_COCKTAIL_FILTERS, toCocktailSearchParams } from '../../model/cocktailFilters.ts'
import styles from './BaseSpiritTiles.module.css'

interface BaseSpiritTilesProps {
  cocktails: readonly Cocktail[]
}

/** One tile per base spirit, linking to the cocktail list filtered by it. */
export function BaseSpiritTiles({ cocktails }: BaseSpiritTilesProps) {
  const countsByBase = countBy(cocktails, (cocktail) => cocktail.baseCategory)
  const bases = pickUsedValues(LIQUOR_CATEGORIES, countsByBase.keys())

  return (
    <ul className={styles.tiles}>
      {bases.map((base) => {
        const total = countsByBase.get(base) ?? 0
        const filters = { ...DEFAULT_COCKTAIL_FILTERS, bases: [base] }

        return (
          <li key={base}>
            <Link to={paths.cocktails(toCocktailSearchParams(filters))} className={styles.tile}>
              <span className={styles.name}>{LIQUOR_CATEGORY_LABELS[base]}</span>
              <span className={styles.count}>
                {total} {pluralize(total, 'cocktail')}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
