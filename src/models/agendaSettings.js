import { assignDefinedProps } from 'SVUtils'

export class AgendaSettings {
  showLocationInAgenda = false
  showPresentersInAgenda = false

  /**
   * AgendaSettings class model
   * @property {boolean=} showLocationInAgenda
   * @property {boolean=} showPresentersInAgenda
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
