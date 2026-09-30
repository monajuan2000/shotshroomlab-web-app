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
  COCKTAIL_SORT_LABELS,
  COCKTAIL_SORT_ORDERS,
  CocktailFilterPanel,
  applyCocktailFilters,
  useCocktailFilters,
  useCocktails,
} from '../../features/cocktails/index.ts'
import { LIQUOR_CATEGORIES } from '../../features/liquors/index.ts'
import { CocktailGrid } from '../../widgets/CocktailGrid/index.ts'

const SORT_OPTIONS = toOptions(COCKTAIL_SORT_ORDERS, COCKTAIL_SORT_LABELS)

export function CocktailsPage() {
  useDocumentTitle('Cocktails')
  const cocktails = useCocktails()
  const { filters, updateFilters, resetFilters } = useCocktailFilters()
  // Changing the key remounts the search box so "Clear all" also clears its text.
  const [searchKey, setSearchKey] = useState(0)

  function handleReset() {
    resetFilters()
    setSearchKey((current) => current + 1)
  }

  return (
    <>
      <PageHeader
        eyebrow="Recipes"
        title="Cocktails"
        description="Search by name or ingredient, and narrow the list by spirit, flavor, method or difficulty."
      />
      <AsyncView result={cocktails} loadingLabel="Loading cocktails…">
        {(allCocktails) => {
          const visibleCocktails = applyCocktailFilters(allCocktails, filters)
          const availableBases = pickUsedValues(
            LIQUOR_CATEGORIES,
            allCocktails.map((cocktail) => cocktail.baseCategory),
          )

          return (
            <CatalogLayout
              filters={
                <CocktailFilterPanel
                  filters={filters}
                  availableBases={availableBases}
                  onChange={updateFilters}
                  onReset={handleReset}
                />
              }
              toolbar={
                <>
                  <SearchInput
                    key={searchKey}
                    label="Search cocktails"
                    placeholder="Search by name or ingredient"
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
              summary={`Showing ${visibleCocktails.length} of ${allCocktails.length} cocktails`}
            >
              {visibleCocktails.length > 0 ? (
                <CocktailGrid cocktails={visibleCocktails} />
              ) : (
                <EmptyState
                  icon="search"
                  title="No cocktails match your search"
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
