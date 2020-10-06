import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class AgendaDisplayProperties {
  dateFormat = 'dd/MM/yyyy'
  timeFormat = '24'

  /**
   * AgendaDisplayProperties class model
   * @param {object} params
   * @param {"dd/MM/yyyy"|"MM/dd/yyyy"|"yyyy-MM-dd"} params.dateFormat
   * @param {'12'|'24'} params.timeFormat
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
