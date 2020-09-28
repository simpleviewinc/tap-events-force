import { getStore, dispatch } from 'SVStore'
import { ActionTypes, Values } from 'SVConstants'
import { setAgendaSessions } from 'SVActions/session/setAgendaSessions'
import { isArr, flatMap } from '@keg-hub/jsutils'

const { CATEGORIES, SUB_CATEGORIES } = Values

/**
 * applyFilters
 */
export const applySessionFilters = () => {
  const { items } = getStore()?.getState()
  const selectedFilters = items?.filters?.selectedFilters || []
  const sessions = items?.sessions
  const agendaDays = items?.agendaDays

  applyLabelFilters(selectedFilters, sessions, agendaDays)

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

const applyLabelFilters = (selectedFilters, sessions, agendaDays) => {
  // if filters are empty then we set default data
  if (selectedFilters.length === 0) setAgendaSessions(sessions, agendaDays)
  else {
    // 1. reduce the filter items to just the ids
    // 2. filter the sessions array with the filter ids
    const filterIds = flatMap(selectedFilters, item => [item.identifier])
    const filteredSessions = sessions.filter(
      session =>
        isArr(session.labelIdentifiers) &&
        session.labelIdentifiers.some(id => filterIds.includes(id))
    )
    console.log(filteredSessions)
    setAgendaSessions(filteredSessions, agendaDays)
  }
}
