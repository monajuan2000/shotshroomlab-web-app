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
import { useLocale, useMessages } from '../../shared/i18n/index.ts'
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
import { cocktailsPageMessages } from './CocktailsPage.messages.ts'

export function CocktailsPage() {
  const { locale } = useLocale()
  const messages = useMessages(cocktailsPageMessages)
  useDocumentTitle(messages.documentTitle)
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
        eyebrow={messages.eyebrow}
        title={messages.title}
        description={messages.description}
      />
      <AsyncView result={cocktails} loadingLabel={messages.loading}>
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
                    label={messages.searchLabel}
                    placeholder={messages.searchPlaceholder}
                    initialValue={filters.query}
                    onSearch={(query) => updateFilters({ query })}
                  />
                  <SelectField
                    label={messages.sortBy}
                    value={filters.sort}
                    options={toOptions(COCKTAIL_SORT_ORDERS, COCKTAIL_SORT_LABELS[locale])}
                    onChange={(sort) => updateFilters({ sort })}
                  />
                </>
              }
              summary={messages.summary(visibleCocktails.length, allCocktails.length)}
            >
              {visibleCocktails.length > 0 ? (
                <CocktailGrid cocktails={visibleCocktails} />
              ) : (
                <EmptyState
                  icon="search"
                  title={messages.emptyTitle}
                  description={messages.emptyDescription}
                  actions={<Button onClick={handleReset}>{messages.clearFilters}</Button>}
                />
              )}
            </CatalogLayout>
          )
        }}
      </AsyncView>
    </>
  )
}
