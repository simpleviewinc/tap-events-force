/**
 * Returns the agenda day with the matching active day number
 * @param {Array.<import('SVModels/agendaDay').AgendaDay>} agendaDays
 * @param {Number} activeDayNumber
 */
export const getCurrentDay = (agendaDays = [], activeDayNumber) =>
  agendaDays.length
    ? agendaDays.find(day => day.dayNumber === activeDayNumber) || null
    : null
