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
   * @param {boolean=} params.isUnlimited
   * @param {number=} params.remainingPlaces - Only populated if isUnlimited = false
   * @param {boolean=} params.isWaitingListAvailable - Only populated if isUnlimited = false
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
