import { assignDefinedProps } from 'SVUtils'

export class AgendaSettings {
  showLocationInAgenda = false
  showPresentersInAgenda = false
  militaryTime = true
  activeDayNumber = 1

  /**
   * AgendaSettings class model
   * @param {object} params
   * @param {number} params.activeAgendaDay - the day the user has selected from the agenda
   * @param {boolean=} params.showLocationInAgenda
   * @param {boolean=} params.showPresentersInAgenda
   * @param {boolean=} params.militaryTime - if true, use military time for date formats in the agenda
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
