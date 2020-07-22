/**
 * Returns the agenda day with the matching active day number
 * @param {Array<AgendaDay>} agendaDays
 * @param {Number} activeDayNumber
 */
export const getCurrentDay = (agendaDays = [], activeDayNumber) =>
  agendaDays.length
    ? agendaDays.find(day => day.dayNumber === activeDayNumber)
    : null
