/**
 * wrapper for date parse so it doesn't crash on safari
 * @param {string|Date} date - some date ex: 2020-08-03 13:00:00
 * @returns {number|null}
 */
export const parseDate = date => {
  let parsed = Date.parse(date)
  if (isNaN(parsed)) parsed = Date.parse(date?.replace(/-/g, '/'))
  return parsed || null
}
