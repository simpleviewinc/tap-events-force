import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class AgendaDay {
  dayNumber = undefined
  date = new Date()
  dayName = ''
  /**
   * AgendaSettings class model
   * @property {number} dayNumber - the day number in the agenda
   * @property {string} date - the date string
   * @property {string} dayName - label to display
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
