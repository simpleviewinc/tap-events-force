/**
 * Price class model
 */
export class Price {
  /**
   * @param {object} props
   * @property {string=} currency - ISO 4217
   * @property {number=} amount
   */
  constructor({ currency = '', amount = 0 } = {}) {
    this.currency = currency
    this.amount = amount
  }
}
