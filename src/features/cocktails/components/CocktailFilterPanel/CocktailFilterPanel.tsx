import { FilterGroup, FilterPanel } from '../../../../shared/components/index.ts'
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

const METHOD_OPTIONS = toOptions(PREPARATION_METHODS, PREPARATION_METHOD_LABELS)
const DIFFICULTY_OPTIONS = toOptions(DIFFICULTY_LEVELS, DIFFICULTY_LEVEL_LABELS)
const FLAVOR_OPTIONS = toOptions(FLAVOR_PROFILES, FLAVOR_PROFILE_LABELS)

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
  return (
    <FilterPanel activeCount={countActiveCocktailFilters(filters)} onReset={onReset}>
      <FilterGroup
        legend="Base spirit"
        options={toOptions(availableBases, LIQUOR_CATEGORY_LABELS)}
        selected={filters.bases}
        onChange={(bases) => onChange({ bases })}
      />
      <FilterGroup
        legend="Flavor"
        options={FLAVOR_OPTIONS}
        selected={filters.flavors}
        onChange={(flavors) => onChange({ flavors })}
      />
      <FilterGroup
        legend="Method"
        options={METHOD_OPTIONS}
        selected={filters.methods}
        onChange={(methods) => onChange({ methods })}
      />
      <FilterGroup
        legend="Difficulty"
        options={DIFFICULTY_OPTIONS}
        selected={filters.difficulties}
        onChange={(difficulties) => onChange({ difficulties })}
      />
    </FilterPanel>
  )
}
