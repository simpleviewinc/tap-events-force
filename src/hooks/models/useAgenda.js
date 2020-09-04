import { get, pickKeys } from '@keg-hub/jsutils'
import { getCurrentDay, getLatestDay, isLatestDay } from 'SVUtils'
import { useSelector, shallowEqual } from 'react-redux'

/**
 * @function
 * useAgenda - hook for acquiring data related to the agenda
 * @return {Object} data relevant to the agenda, including
 * computed values like the current and latest agenda days { agendaSettings, agendaDays, currentDay, latestDay }
 */
export const useAgenda = () => {
  const {
    settings: { agendaSettings = {} },
    agendaDays = [],
  } = useSelector(
    store => pickKeys(store.items, [ 'settings', 'agendaDays' ]),
    shallowEqual
  )

  const currentDayNumber = get(agendaSettings, 'activeDayNumber')
  const currentAgendaDay = getCurrentDay(agendaDays, currentDayNumber)
  const latestAgendaDay = getLatestDay(agendaDays)
  const currentDayIsLatest = isLatestDay(currentDayNumber, agendaDays)
  const isFirstDay = currentDayNumber === 1

  return {
    agendaSettings,
    agendaDays,
    currentAgendaDay,
    latestAgendaDay,
    currentDayNumber,
    isLatestDay: currentDayIsLatest,
    isFirstDay,
  }
}
