import { FilterGroup, FilterPanel } from '../../../../shared/components/index.ts'
import { useLocale, useMessages } from '../../../../shared/i18n/index.ts'
import { toOptions } from '../../../../shared/lib/options.ts'
import { LIQUOR_CATEGORY_LABELS, type LiquorCategory } from '../../model/liquor.ts'
import { countActiveLiquorFilters, type LiquorFilters } from '../../model/liquorFilters.ts'
import { liquorFilterPanelMessages } from './LiquorFilterPanel.messages.ts'

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
  const { locale } = useLocale()
  const messages = useMessages(liquorFilterPanelMessages)

  return (
    <FilterPanel activeCount={countActiveLiquorFilters(filters)} onReset={onReset}>
      <FilterGroup
        legend={messages.category}
        options={toOptions(availableCategories, LIQUOR_CATEGORY_LABELS[locale])}
        selected={filters.categories}
        onChange={(categories) => onChange({ categories })}
      />
    </FilterPanel>
  )
}
