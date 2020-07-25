import { assignDefinedProps } from 'SVUtils'
/**
 * Price class model
 */
export class Price {
  currency = ''
  amount = 0

  /**
   * @param {object} params
   * @param {string=} params.currency - ISO 4217
   * @param {number=} params.amount
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
