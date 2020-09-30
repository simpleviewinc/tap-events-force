import { format } from 'date-fns'

/**
 * Formats the given date to hh:mm format
 * @param {string|Date} date - some date ex: 2020-08-03 13:00:00. if null, it will take local date/time
 * @param {boolean} military - whether to format in 24 hr or not
 * @returns {string}
 */
export const getTimeFromDate = (date, military = true) => {
  let parsed = Date.parse(new Date(date.replace(/-/g, '/')))
  if (isNaN(parsed)) parsed = new Date(date.replace(/-/g, '/'))
  return format(parsed, military ? 'HH:mm' : 'h:mma')
}
