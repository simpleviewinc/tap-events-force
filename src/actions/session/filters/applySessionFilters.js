import { getStore, dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { setWaitingListActive } from '../booking/setWaitingListActive'
import { setAllowBooking } from '../booking/setAllowBooking'
import { setAgendaSessions } from 'SVActions/session/setAgendaSessions'
import {
  sessionsFromLabelFilters,
  sessionsFromStateFilters,
  sessionsFromPresenterFilters,
} from 'SVUtils/filters'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * Updates the state of the active filters with the sate from the selected filters
 * @param {Array<Session>} sessions - List of sessions the will be filtered by the active filters
 * @param {Array.<import('SVModels/agendaDay').AgendaDay>} agendaDays - Days of the sessions
 *
 * @returns {void}
 */
export const applySessionFilters = (sessions, agendaDays) => {
  const { items } = getStore()?.getState()
  const selectedFilters = items?.filters?.selectedFilters || []
  console.log('before')
  const selectedPresenterFilters =
    items?.filters?.selectedPresenterFilters || []

  console.log(selectedPresenterFilters)
  sessions = sessions || items?.sessions
  agendaDays = agendaDays || items?.agendaDays

  let filteredSessions =
    selectedFilters.length > 0
      ? sessionsFromLabelFilters(
          selectedFilters,
          sessionsFromStateFilters(selectedFilters, sessions)
        )
      : sessions
  console.log(filteredSessions)

  filteredSessions = sessionsFromPresenterFilters(
    selectedPresenterFilters,
    filteredSessions
  )
  console.log('after')
  // Set the waiting list filter label for only viewable sessions
  setWaitingListActive(filteredSessions)

  // Set the select/selected filter label for only viewable sessions
  setAllowBooking(filteredSessions)

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

  dispatch({
    type: ActionTypes.SET_ITEM,
    payload: {
      category: CATEGORIES.FILTERS,
      key: SUB_CATEGORIES.ACTIVE_PRESENTER_FILTERS,
      item: selectedPresenterFilters,
    },
  })
}
