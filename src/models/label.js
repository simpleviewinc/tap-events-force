import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class Label {
  identifier = ''
  name = ''
  className = ''

  /**
   * Label class model
   * @param {object} params
   * @param {string} params.identifier
   * @param {string} params.name
   * @param {string} params.className
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
