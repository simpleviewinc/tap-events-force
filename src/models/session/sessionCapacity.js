/**
 * SessionCapacity class model
 */
export class SessionCapacity {
  /**
   * @param {object=} props
   * @property {boolean=} isUnlimited
   * @property {number=} remainingPlaces - Only populated if isUnlimited = false
   * @property {boolean=} isWaitingListAvailable - Only populated if isUnlimited = false
   */
  constructor({
    isUnlimited = false,
    remainingPlaces = null,
    isWaitingListAvailable = null,
  } = {}) {
    this.isUnlimited = isUnlimited
    this.remainingPlaces = remainingPlaces
    this.isWaitingListAvailable = isWaitingListAvailable
  }
}
