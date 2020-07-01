import { assignDefinedProps } from 'SVUtils'

/**
 * SessionCapacity class model
 */
export class SessionCapacity {
  isUnlimited = false
  remainingPlaces = null
  isWaitingListAvailable = null

  /**
   * @param {object} params
   * @property {boolean=} isUnlimited
   * @property {number=} remainingPlaces - Only populated if isUnlimited = false
   * @property {boolean=} isWaitingListAvailable - Only populated if isUnlimited = false
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
