import { assignDefinedProps } from 'SVUtils'

export class Label {
  identifier = ''
  name = ''
  className = ''

  /**
   * Label class model
   * @property {string} identifier
   * @property {string} name
   * @property {string} className
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
