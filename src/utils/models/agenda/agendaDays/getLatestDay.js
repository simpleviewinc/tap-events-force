/**
 * Returns the maximum element as identified by the prop extracted from propSelector
 * @param {*} arr
 * @param {*} propSelector
 * @example
 * const items = [ { num: 1 }, { num: 3 } ]
 * findMax(items, item => item.num) // returns { num: 3 }
 */
const findMax = (arr = [], propSelector) =>
  arr.length &&
  arr.reduce((maxSoFar, next) => {
    return propSelector(next) > propSelector(maxSoFar) ? next : maxSoFar
  })

/**
 * Returns the latest day in the list of agenda days
 * @param {Array<AgendaDay>} agendaDays
 * @return {AgendaDay} - day that occurs latest in agenda
 */
export const getLatestDay = (agendaDays = []) =>
  agendaDays.length ? findMax(agendaDays, day => day.dayNumber) : null
