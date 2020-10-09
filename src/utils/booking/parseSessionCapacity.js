import { get } from '@keg-hub/jsutils'

/**
 * @typedef ParsedCapacity
 * @property {boolean} isWaitingListAvailable=false - true if waiting list is available on session
 * @property {boolean} isUnlimited=false - true if session has no booking limit
 * @property {number} remainingCount=0 - remaining booking capacity
 */

/**
 * Gets and infers capacity-related data from the session.capacity object
 * @param {Object} sessionCapacity
 * @return {ParsedCapacity} object with defaults if no value was present
 */
export const parseSessionCapacity = (sessionCapacity = {}) => {
  // get the remaining spots for the session
  const waitingListIsAvailable = get(
    sessionCapacity,
    'isWaitingListAvailable',
    false
  )

  const isUnlimited = get(sessionCapacity, 'isUnlimited', false)

  const remainingCount = !isUnlimited
    ? get(sessionCapacity, 'remainingPlaces', 0)
    : Infinity

  return { waitingListIsAvailable, isUnlimited, remainingCount }
}
