import { Button, Icon } from '../../../../shared/components/index.ts'
import { useFavorites } from '../../hooks/useFavorites.ts'
import type { FavoriteKind } from '../../model/favorites.ts'
import styles from './FavoriteButton.module.css'

interface FavoriteButtonProps {
  kind: FavoriteKind
  id: string
  /** Used in the accessible label, for example "Save Negroni to favorites". */
  itemName: string
  appearance?: 'icon' | 'full'
}

export function FavoriteButton({ kind, id, itemName, appearance = 'icon' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isSaved = isFavorite(kind, id)
  const label = isSaved ? `Remove ${itemName} from favorites` : `Save ${itemName} to favorites`

  if (appearance === 'full') {
    return (
      <Button
        variant="secondary"
        className={styles.full}
        aria-pressed={isSaved}
        onClick={() => toggleFavorite(kind, id)}
      >
        <Icon name="heart" size={18} filled={isSaved} />
        {isSaved ? 'Saved' : 'Save'}
      </Button>
    )
  }

  return (
    <button
      type="button"
      className={styles.icon}
      aria-pressed={isSaved}
      aria-label={label}
      title={label}
      onClick={() => toggleFavorite(kind, id)}
    >
      <Icon name="heart" size={18} filled={isSaved} />
    </button>
  )
}
