import { deepFreeze } from 'jsutils'

/**
 * sessionCapacity object
 * @typedef sessionCapacity
 * @type {object}
 * @property {boolean} isUnlimited
 * @property {number?} remainingPlaces - Only populated if isUnlimited = false
 * @property {boolean?} isWaitingListAvailable - Only populated if isUnlimited = false
 */
/** @type {sessionCapacity} */
export const sessionCapacity = deepFreeze({
  isUnlimited: false,
  remainingPlaces: null,
  isWaitingListAvailable: null,
})
