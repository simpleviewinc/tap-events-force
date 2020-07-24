import { assignDefinedProps } from 'SVUtils'

export class AgendaSettings {
  showLocationInAgenda = false
  showPresentersInAgenda = false
  militaryTime = true

  /**
   * AgendaSettings class model
   * @property {boolean=} showLocationInAgenda
   * @property {boolean=} showPresentersInAgenda
   * @property {boolean=} militaryTime - if true, use military time for date formats in the agenda
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
