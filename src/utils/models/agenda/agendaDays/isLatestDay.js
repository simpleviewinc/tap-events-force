import { getLatestDay } from './getLatestDay'

/**
 * @param {Number} currentDayNumber
 * @param {Array<import('SVModels/agendaDay').AgendaDay>} agendaDays
 * @returns {boolean} - true if the current day number is the latest day in the agenda
 */
export const isLatestDay = (currentDayNumber = 0, agendaDays = []) => {
  const latestAgendaDay = getLatestDay(agendaDays)
  if (!latestAgendaDay) return false
  return latestAgendaDay.dayNumber === currentDayNumber
}
