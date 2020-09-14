import { getStore } from 'SVStore'

/**
 * applyFilters
 * @todo: to be completed in ticket https://jira.simpleviewtools.com/browse/ZEN-285
 */
export const applySessionFilters = () => {
  // 1. sets the current selectedFilters to activeFilters

  // for now just print out the currently selected filters
  const { items } = getStore()?.getState()
  const selectedFilters = items?.filters?.selectedFilters || []
  console.log('current selected filters: ')
  console.log(...selectedFilters)
}
