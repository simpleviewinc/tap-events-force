/**
 * @typedef ParsedCapacity
 * @property {boolean} isWaitingListAvailable=false - true if waiting list is available on session
 * @property {boolean} isUnlimited=false - true if session has no booking limit
 * @property {number} remainingBookingPlaces=0 - remaining booking list capacity
 * @property {number} remainingWaitingPlaces=0 - remaining waiting list capacity
 */

/**
 * Gets and infers capacity-related data from the session.capacity object
 * @param {Object} sessionCapacity
 * @return {ParsedCapacity} object with defaults if no value was present
 */
export const parseSessionCapacity = (sessionCapacity = {}) => {
  // get the remaining spots for the session
  const waitingListIsAvailable =
    sessionCapacity?.isWaitingListAvailable ?? false

  const isUnlimited = sessionCapacity?.isUnlimited ?? false

  const remainingBookingPlaces = !isUnlimited
    ? sessionCapacity?.remainingPlaces ?? 0
    : Infinity

  // if a waiting list capacity is defined, use it. If it's undefined, but waitingList is still available,
  // consider the capacity infinite. Otherwise treat it as empty.
  const remainingWaitingPlaces = waitingListIsAvailable
    ? sessionCapacity?.waitingListRemainingPlaces ?? Infinity
    : 0

  return {
    waitingListIsAvailable,
    isUnlimited,
    remainingBookingPlaces,
    remainingWaitingPlaces,
  }
}
