import { FilterGroup, FilterPanel } from '../../../../shared/components/index.ts'
import { useLocale, useMessages } from '../../../../shared/i18n/index.ts'
import { toOptions } from '../../../../shared/lib/options.ts'
import { LIQUOR_CATEGORY_LABELS, type LiquorCategory } from '../../../liquors/model/index.ts'
import {
  DIFFICULTY_LEVEL_LABELS,
  DIFFICULTY_LEVELS,
  FLAVOR_PROFILE_LABELS,
  FLAVOR_PROFILES,
  PREPARATION_METHOD_LABELS,
  PREPARATION_METHODS,
} from '../../model/cocktail.ts'
import { countActiveCocktailFilters, type CocktailFilters } from '../../model/cocktailFilters.ts'
import { cocktailFilterPanelMessages } from './CocktailFilterPanel.messages.ts'

interface CocktailFilterPanelProps {
  filters: CocktailFilters
  /** Base spirits used by at least one cocktail, in display order. */
  availableBases: readonly LiquorCategory[]
  onChange: (patch: Partial<CocktailFilters>) => void
  onReset: () => void
}

export function CocktailFilterPanel({
  filters,
  availableBases,
  onChange,
  onReset,
}: CocktailFilterPanelProps) {
  const { locale } = useLocale()
  const messages = useMessages(cocktailFilterPanelMessages)

  return (
    <FilterPanel activeCount={countActiveCocktailFilters(filters)} onReset={onReset}>
      <FilterGroup
        legend={messages.base}
        options={toOptions(availableBases, LIQUOR_CATEGORY_LABELS[locale])}
        selected={filters.bases}
        onChange={(bases) => onChange({ bases })}
      />
      <FilterGroup
        legend={messages.flavor}
        options={toOptions(FLAVOR_PROFILES, FLAVOR_PROFILE_LABELS[locale])}
        selected={filters.flavors}
        onChange={(flavors) => onChange({ flavors })}
      />
      <FilterGroup
        legend={messages.method}
        options={toOptions(PREPARATION_METHODS, PREPARATION_METHOD_LABELS[locale])}
        selected={filters.methods}
        onChange={(methods) => onChange({ methods })}
      />
      <FilterGroup
        legend={messages.difficulty}
        options={toOptions(DIFFICULTY_LEVELS, DIFFICULTY_LEVEL_LABELS[locale])}
        selected={filters.difficulties}
        onChange={(difficulties) => onChange({ difficulties })}
      />
    </FilterPanel>
  )
}
