import { getStore, dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { setWaitingListActive } from '../booking/setWaitingListActive'
import { setAgendaSessions } from 'SVActions/session/setAgendaSessions'
import {
  sessionsFromLabelFilters,
  sessionsFromStateFilters,
} from 'SVUtils/filters'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * applyFilters
 */
export const applySessionFilters = (sessions, agendaDays) => {
  const { items } = getStore()?.getState()
  const selectedFilters = items?.filters?.selectedFilters || []

  sessions = sessions || items?.sessions
  agendaDays = agendaDays || items?.agendaDays

  const filteredSessions =
    selectedFilters.length > 0
      ? sessionsFromLabelFilters(
          selectedFilters,
          sessionsFromStateFilters(selectedFilters, sessions)
        )
      : sessions

  // Set the waiting list filter label for only viewable sessions
  setWaitingListActive(filteredSessions)

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
