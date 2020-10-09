import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'
import { AgendaDisplayProperties } from './agendaDisplayProperties'

export class AgendaSettings {
  showLocationInAgenda = false
  showPresentersInAgenda = false
  agendaDisplayProperties = new AgendaDisplayProperties()
  activeDayNumber = 1

  /**
   * AgendaSettings class model
   * @param {object} params
   * @param {number} params.activeDayNumber - the day the user has selected from the agenda
   * @param {boolean=} params.showLocationInAgenda
   * @param {boolean=} params.showPresentersInAgenda
   * @param {import('SVModels/agendaDisplayProperties').AgendaDisplayProperties} params.agendaDisplayProperties
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
