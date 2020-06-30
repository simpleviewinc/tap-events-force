import { assignDefinedProps } from 'SVUtils'
/**
 * Price class model
 */
export class Price {
  currency = ''
  amount = 0

  /**
   * @property {string=} currency - ISO 4217
   * @property {number=} amount
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
