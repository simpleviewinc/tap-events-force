import { getStore, dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { setAgendaSessions } from 'SVActions/session/setAgendaSessions'
import {
  sessionsFromLabelFilters,
  sessionsFromStateFilters,
} from 'SVUtils/filters'
const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * applyFilters
 */
export const applySessionFilters = () => {
  const { items } = getStore()?.getState()
  const selectedFilters = items?.filters?.selectedFilters || []
  const sessions = items?.sessions
  const agendaDays = items?.agendaDays

  let filteredSessions = sessions
  if (selectedFilters.length > 0) {
    // filter by states
    filteredSessions = sessionsFromStateFilters(selectedFilters, sessions)

    // filter by labels
    filteredSessions = sessionsFromLabelFilters(
      selectedFilters,
      filteredSessions
    )
  }

  // update agenda sessions store
  setAgendaSessions(filteredSessions, agendaDays)

  // set the current selectedFilters to activeFilters
  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.FILTERS,
      key: SUB_CATEGORIES.ACTIVE_FILTERS,
      item: selectedFilters,
    },
  })
}
