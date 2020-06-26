/**
 * Price class model
 */
export class Price {
  /**
   * @param {string=} currency - ISO 4217
   * @param {number=} amount
   */
  constructor(currency = '', amount = 0) {
    this.currency = currency
    this.amount = amount
  }
}
