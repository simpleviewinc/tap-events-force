/**
 * AgendaSettings class model
 */
export class AgendaSettings {
  /**
   * @param {boolean=} showLocationInAgenda
   * @param {boolean=} showPresentersInAgenda
   */
  constructor(showLocationInAgenda = false, showPresentersInAgenda = false) {
    this.showLocationInAgenda = showLocationInAgenda
    this.showPresentersInAgenda = showPresentersInAgenda
  }
}
