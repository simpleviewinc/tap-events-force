import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class Location {
  identifier = ''
  name = ''

  /**
   * Location class model
   * @param {object} params
   * @param {string=} params.identifier
   * @param {string=} params.name
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
