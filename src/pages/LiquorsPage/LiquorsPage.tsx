import { useState } from 'react'
import {
  AsyncView,
  Button,
  CatalogLayout,
  EmptyState,
  PageHeader,
  SearchInput,
  SelectField,
} from '../../shared/components/index.ts'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle.ts'
import { pickUsedValues, toOptions } from '../../shared/lib/options.ts'
import {
  LIQUOR_CATEGORIES,
  LIQUOR_SORT_LABELS,
  LIQUOR_SORT_ORDERS,
  LiquorFilterPanel,
  applyLiquorFilters,
  useLiquorFilters,
  useLiquors,
} from '../../features/liquors/index.ts'
import { LiquorGrid } from '../../widgets/LiquorGrid/index.ts'

const SORT_OPTIONS = toOptions(LIQUOR_SORT_ORDERS, LIQUOR_SORT_LABELS)

export function LiquorsPage() {
  useDocumentTitle('Spirits')
  const liquors = useLiquors()
  const { filters, updateFilters, resetFilters } = useLiquorFilters()
  // Changing the key remounts the search box so "Clear all" also clears its text.
  const [searchKey, setSearchKey] = useState(0)

  function handleReset() {
    resetFilters()
    setSearchKey((current) => current + 1)
  }

  return (
    <>
      <PageHeader
        eyebrow="The back bar"
        title="Spirits"
        description="Get to know the bottles behind every cocktail: their origin, strength and flavor."
      />
      <AsyncView result={liquors} loadingLabel="Loading spirits…">
        {(allLiquors) => {
          const visibleLiquors = applyLiquorFilters(allLiquors, filters)
          const availableCategories = pickUsedValues(
            LIQUOR_CATEGORIES,
            allLiquors.map((liquor) => liquor.category),
          )

          return (
            <CatalogLayout
              filters={
                <LiquorFilterPanel
                  filters={filters}
                  availableCategories={availableCategories}
                  onChange={updateFilters}
                  onReset={handleReset}
                />
              }
              toolbar={
                <>
                  <SearchInput
                    key={searchKey}
                    label="Search spirits"
                    placeholder="Search by name, origin or flavor"
                    initialValue={filters.query}
                    onSearch={(query) => updateFilters({ query })}
                  />
                  <SelectField
                    label="Sort by"
                    value={filters.sort}
                    options={SORT_OPTIONS}
                    onChange={(sort) => updateFilters({ sort })}
                  />
                </>
              }
              summary={`Showing ${visibleLiquors.length} of ${allLiquors.length} spirits`}
            >
              {visibleLiquors.length > 0 ? (
                <LiquorGrid liquors={visibleLiquors} />
              ) : (
                <EmptyState
                  icon="search"
                  title="No spirits match your search"
                  description="Try a different word or remove some filters."
                  actions={<Button onClick={handleReset}>Clear all filters</Button>}
                />
              )}
            </CatalogLayout>
          )
        }}
      </AsyncView>
    </>
  )
}
