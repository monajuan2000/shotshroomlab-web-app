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
  LIQUOR_CATEGORIES,
  LIQUOR_SORT_LABELS,
  LIQUOR_SORT_ORDERS,
  LiquorFilterPanel,
  applyLiquorFilters,
  useLiquorFilters,
  useLiquors,
} from '../../features/liquors/index.ts'
import { LiquorGrid } from '../../widgets/LiquorGrid/index.ts'
import { liquorsPageMessages } from './LiquorsPage.messages.ts'

export function LiquorsPage() {
  const { locale } = useLocale()
  const messages = useMessages(liquorsPageMessages)
  useDocumentTitle(messages.documentTitle)
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
        eyebrow={messages.eyebrow}
        title={messages.title}
        description={messages.description}
      />
      <AsyncView result={liquors} loadingLabel={messages.loading}>
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
                    label={messages.searchLabel}
                    placeholder={messages.searchPlaceholder}
                    initialValue={filters.query}
                    onSearch={(query) => updateFilters({ query })}
                  />
                  <SelectField
                    label={messages.sortBy}
                    value={filters.sort}
                    options={toOptions(LIQUOR_SORT_ORDERS, LIQUOR_SORT_LABELS[locale])}
                    onChange={(sort) => updateFilters({ sort })}
                  />
                </>
              }
              summary={messages.summary(visibleLiquors.length, allLiquors.length)}
            >
              {visibleLiquors.length > 0 ? (
                <LiquorGrid liquors={visibleLiquors} />
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
