import { get } from '@keg-hub/jsutils'

/**
 * Gets and infers capacity-related data from the session.capacity object
 * @param {Object} sessionCapacity
 */
export const parseSessionCapacity = sessionCapacity => {
  // get the remaining spots for the session
  const waitingListIsAvailable = get(sessionCapacity, 'isWaitingListAvailable')

  const isUnlimited = get(sessionCapacity, 'isUnlimited')

  const remainingCount = !isUnlimited
    ? get(sessionCapacity, 'remainingPlaces')
    : Infinity

  return { waitingListIsAvailable, isUnlimited, remainingCount }
}
