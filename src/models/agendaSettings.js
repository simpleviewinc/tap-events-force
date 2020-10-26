import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class AgendaSettings {
  showLocationInAgenda = false
  showPresentersInAgenda = false
  activeDayNumber = 1

  /**
   * AgendaSettings class model
   * @param {object} params
   * @param {number} params.activeDayNumber - the day the user has selected from the agenda
   * @param {boolean=} params.showLocationInAgenda
   * @param {boolean=} params.showPresentersInAgenda
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
