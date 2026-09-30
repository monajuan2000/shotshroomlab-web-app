import { paths } from '../../../../shared/config/routes.ts'
import type { UnitSystem } from '../../../../shared/lib/units.ts'
import { Link } from '../../../../shared/router/index.ts'
import type { Ingredient } from '../../model/cocktail.ts'
import { formatMeasure } from '../../model/measure.ts'
import styles from './IngredientList.module.css'

interface IngredientListProps {
  ingredients: readonly Ingredient[]
  unitSystem: UnitSystem
  servings: number
}

export function IngredientList({ ingredients, unitSystem, servings }: IngredientListProps) {
  return (
    <ul className={styles.list}>
      {ingredients.map((ingredient) => (
        <li key={ingredient.name} className={styles.item}>
          <span className={styles.measure}>
            {formatMeasure(ingredient.measure, unitSystem, servings)}
          </span>
          <span>
            {ingredient.liquorId ? (
              <Link to={paths.liquor(ingredient.liquorId)} className={styles.link}>
                {ingredient.name}
              </Link>
            ) : (
              ingredient.name
            )}
            {ingredient.optional && <span className={styles.optional}>(optional)</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}
