import { getStore, dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { setAgendaSessions } from 'SVActions/session/setAgendaSessions'
import { isArr, flatMap } from '@keg-hub/jsutils'
import { getBookingState } from 'SVUtils/models/sessions/getBookingState'

const { CATEGORIES, SUB_CATEGORIES, SESSION_BOOKING_STATES } = Values
const bookingStateKeys = Object.keys(SESSION_BOOKING_STATES)
/**
 * applyFilters
 */
export const applySessionFilters = () => {
  const { items } = getStore()?.getState()
  const selectedFilters = items?.filters?.selectedFilters || []
  const sessions = items?.sessions
  const agendaDays = items?.agendaDays
  console.log(selectedFilters, 'filters')

  // 1. filter by states
  let filteredSessions = applyStateFilters(selectedFilters, sessions)

  // 2. filter by labels
  filteredSessions = applyLabelFilters(selectedFilters, filteredSessions)

  // 3. update agenda sessions store
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

/**
 * Filter by booking states
 * @param {Array.<import('SVModels/label').Label>} selectedFilters
 * @param {Array.<import('SVModels/session').Session>} sessions
 *
 * @returns {Array.<import('SVModels/session').Session>} - list filtered by button state or original list
 */
const applyStateFilters = (selectedFilters, sessions) => {
  const hasStateFilters = selectedFilters.some(label =>
    bookingStateKeys.some(state => label.identifier === state)
  )
  return hasStateFilters
    ? sessions.filter(session =>
        selectedFilters.some(
          label => label.name.toLowerCase() === getBookingState(session)
        )
      )
    : sessions
}

/**
 * Filter by labels
 * @param {Array.<import('SVModels/label').Label>} labels
 * @param {Array.<import('SVModels/session').Session>} sessions
 *
 * @returns {Array.<import('SVModels/session').Session>}
 */
const applyLabelFilters = (labels, sessions) => {
  const labelFilters = labels.filter(
    item => !bookingStateKeys.includes(item.identifier)
  )
  console.log(labelFilters, 'labelFilter')
  if (labelFilters.length > 0) {
    // 1. reduce the filter items to just the ids
    // 2. filter the sessions array with the filter ids
    console.log(sessions, 'after state filter')
    const labelIds = flatMap(labelFilters, item => [item.identifier])

    console.log(labelIds, 'labelIds')
    return sessions.filter(
      session =>
        isArr(session.labelIdentifiers) &&
        session.labelIdentifiers.some(id => labelIds.includes(id))
    )
  }

  return sessions
}
