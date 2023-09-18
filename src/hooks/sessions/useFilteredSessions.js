import { useMemo } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants/values'
import {
  sessionsFromLabelFilters,
  sessionsFromStateFilters,
  sessionsFromPresenterFilters,
} from 'SVUtils/filters'

const { CATEGORIES } = Values
/**
 * Returns an array of sessions based on the selected filters
 *
 * @returns {Array<import('SVModels/session').Session>}
 */
export const useFilteredSessions = () => {
  const { filters, sessions } = useStoreItems([
    CATEGORIES.FILTERS,
    CATEGORIES.SESSIONS,
  ])
  return useMemo(() => {
    const selectedFilters = filters?.selectedFilters || []
    const selectedPresenterFilters = filters?.selectedPresenterFilters || []
    const hasSelectedFilters = Boolean(
      selectedFilters.length || selectedPresenterFilters.length
    )

    // do basic filtering on SELECTED labels so we can get the count
    let filteredSessions = []

    if (hasSelectedFilters) {
      filteredSessions = sessionsFromLabelFilters(
        selectedFilters,
        sessionsFromStateFilters(selectedFilters, sessions)
      )
      filteredSessions = sessionsFromPresenterFilters(
        selectedPresenterFilters,
        filteredSessions
      )
    }
    return filteredSessions
  }, [ filters, sessions ])
}
