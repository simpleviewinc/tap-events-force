import { assignDefinedProps } from 'SVUtils'

export class Location {
  identifier = ''
  name = ''

  /**
   * Location class model
   * @property {string=} identifier
   * @property {string=} name
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
