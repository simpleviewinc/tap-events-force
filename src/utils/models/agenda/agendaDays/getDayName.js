import { noPropArr } from '@keg-hub/jsutils'

/**
 * Gets the text to display as the day name
 * @param {Array} agendaDays
 * @param {Number} currentDay
 *
 * @returns {string}
 */
export const getDayName = (agendaDays = noPropArr, currentDay) => {
  if (agendaDays.length === 0 || !currentDay) return ''
  const currentAgendaDay = agendaDays.find(
    agendaDay => agendaDay?.dayNumber === currentDay
  )
  return (currentAgendaDay && currentAgendaDay?.dayName) || ''
}
