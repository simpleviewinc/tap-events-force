import { assignDefinedProps } from 'SVUtils'

export class AgendaSettings {
  showLocationInAgenda = false
  showPresentersInAgenda = false
  activeDayNumber = 1

  /**
   * AgendaSettings class model
   * @property {boolean=} showLocationInAgenda
   * @property {boolean=} showPresentersInAgenda
   * @property {number} activeAgendaDay - the day the user has selected from the agenda
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
