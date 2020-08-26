import { assignDefinedProps } from 'SVUtils'

export class AgendaDay {
  dayNumber = undefined
  date = new Date()

  /**
   * AgendaSettings class model
   * @property {number} dayNumber - the day number in the agenda
   * @property {string} date - the date string
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
