/**
 * @returns the milliseconds that have elapsed since the date. If date is undefined, returns 0
 * @param {Object} date 
 */
export const timeSince = (date) => date
  ? ((new Date()) - date)
  : 0
