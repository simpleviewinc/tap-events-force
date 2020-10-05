import { useMemo } from 'react'
import { format, parse } from 'date-fns'

/**
 * Formats the date into a string of the form D MMMM YYYY
 * @param {string} currentDate - current date string
 * @param {boolean} isMobileSize - is currently using mobile size
 * @param {boolean} widthCheck
 */
export const useDateString = (currentDate, isMobileSize, widthCheck) => {
  return useMemo(() => {
    const parsedDate = parse(currentDate, `yyyy-MM-dd`, new Date())
    const dateFormat = isMobileSize
      ? 'd MMM'
      : widthCheck
        ? 'd MMM yyyy'
        : 'd MMMM yyyy'

    return currentDate ? format(parsedDate, dateFormat) : 'N/A'
  }, [ currentDate, isMobileSize, widthCheck ])
}
