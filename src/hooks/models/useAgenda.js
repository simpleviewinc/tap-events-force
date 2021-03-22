import { get } from '@keg-hub/jsutils'
import { getCurrentDay, getLatestDay, isLatestDay, getDayName } from 'SVUtils'
import { useStoreItems } from 'SVHooks/store/useStoreItems'

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
  } = useStoreItems([ 'settings', 'agendaDays' ])

  const currentDayNumber = get(agendaSettings, 'activeDayNumber')
  const currentAgendaDay = getCurrentDay(agendaDays, currentDayNumber)
  const latestAgendaDay = getLatestDay(agendaDays)
  const dayName = getDayName(agendaDays, currentDayNumber)
  const currentDayIsLatest = isLatestDay(currentDayNumber, agendaDays)
  const isFirstDay = currentDayNumber === 1

  return {
    agendaSettings,
    agendaDays,
    currentAgendaDay,
    latestAgendaDay,
    currentDayNumber,
    isLatestDay: currentDayIsLatest,
    agendaLength: agendaDays?.length ?? 0,
    isFirstDay,
    dayName,
  }
}
