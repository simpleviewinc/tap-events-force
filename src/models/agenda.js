import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

export class Agenda {
  startDateTimeLocal = ''
  endDateTimeLocal = ''

  /**
   * Agenda class model
   * @property {string=} startDateTimeLocal - start time of the agenda
   * @property {string=} endDateTimeLocal - end time of the agenda
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
