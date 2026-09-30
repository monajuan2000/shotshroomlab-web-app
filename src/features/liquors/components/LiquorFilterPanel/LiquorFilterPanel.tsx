import { FilterGroup, FilterPanel } from '../../../../shared/components/index.ts'
import { toOptions } from '../../../../shared/lib/options.ts'
import { LIQUOR_CATEGORY_LABELS, type LiquorCategory } from '../../model/liquor.ts'
import { countActiveLiquorFilters, type LiquorFilters } from '../../model/liquorFilters.ts'

interface LiquorFilterPanelProps {
  filters: LiquorFilters
  /** Categories that exist in the catalog, in display order. */
  availableCategories: readonly LiquorCategory[]
  onChange: (patch: Partial<LiquorFilters>) => void
  onReset: () => void
}

export function LiquorFilterPanel({
  filters,
  availableCategories,
  onChange,
  onReset,
}: LiquorFilterPanelProps) {
  return (
    <FilterPanel activeCount={countActiveLiquorFilters(filters)} onReset={onReset}>
      <FilterGroup
        legend="Category"
        options={toOptions(availableCategories, LIQUOR_CATEGORY_LABELS)}
        selected={filters.categories}
        onChange={(categories) => onChange({ categories })}
      />
    </FilterPanel>
  )
}
