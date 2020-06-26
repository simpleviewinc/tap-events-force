/**
 * SessionCapacity class model
 */
export class SessionCapacity {
  /**
   * @param {boolean=} isUnlimited
   * @param {number=} remainingPlaces - Only populated if isUnlimited = false
   * @param {boolean=} isWaitingListAvailable - Only populated if isUnlimited = false
   */
  constructor(
    isUnlimited = false,
    remainingPlaces = null,
    isWaitingListAvailable = null
  ) {
    this.isUnlimited = isUnlimited
    this.remainingPlaces = remainingPlaces
    this.isWaitingListAvailable = isWaitingListAvailable
  }
}
