import { useMemo } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { Values } from 'SVConstants/values'
import {
  sessionsFromLabelFilters,
  sessionsFromStateFilters,
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
    const hasSelectedFilters = Boolean(filters?.selectedFilters.length)

    // do basic filtering on SELECTED labels so we can get the count
    return hasSelectedFilters
      ? sessionsFromLabelFilters(
          filters?.selectedFilters,
          sessionsFromStateFilters(filters?.selectedFilters, sessions)
        )
      : []
  }, [ filters, sessions ])
}
