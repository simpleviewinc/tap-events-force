import { assignDefinedProps } from 'SVUtils'

export class AgendaSettings {
  showLocationInAgenda = false
  showPresentersInAgenda = false

  /**
   * AgendaSettings class model
   * @param {object} params
   * @param {boolean=} params.showLocationInAgenda
   * @param {boolean=} params.showPresentersInAgenda
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
