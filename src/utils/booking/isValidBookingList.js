import { isArr } from '@keg-hub/jsutils'

/**
 * Validates a booking list for a booking request
 * @param {*} list
 * @return {boolean} - true if valid
 */
export const isValidBookingList = list => !list || isArr(list)
