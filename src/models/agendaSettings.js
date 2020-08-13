import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class AgendaSettings {
  showLocationInAgenda = false
  showPresentersInAgenda = false
  militaryTime = true

  /**
   * AgendaSettings class model
   * @param {object} params
   * @param {boolean=} params.showLocationInAgenda
   * @param {boolean=} params.showPresentersInAgenda
   * @param {boolean=} params.militaryTime - if true, use military time for date formats in the agenda
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
