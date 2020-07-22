import { getLatestDay } from './getLatestDay'

/**
 * @param {Number} currentDayNumber
 * @param {Array<AgendaSDay>} agendaDays
 *
 * @returns {boolean} - true if the current day number is the latest day in the agenda
 */
export const isLatestDay = (currentDayNumber = 0, agendaDays = []) => {
  const latestAgendaDay = getLatestDay(agendaDays)
  return latestAgendaDay.dayNumber === currentDayNumber
}
