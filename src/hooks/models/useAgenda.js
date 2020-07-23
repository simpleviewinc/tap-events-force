import { get } from 'jsutils'
import { getCurrentDay, getLatestDay, isLatestDay } from 'SVUtils'
import { useSessionsStore } from '../../store/sessionsStore'

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
  } = useSessionsStore()

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
