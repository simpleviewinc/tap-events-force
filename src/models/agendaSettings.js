/**
 * AgendaSettings class model
 */
export class AgendaSettings {
  /**
   * @param {Object?} props
   * @property {boolean=} showLocationInAgenda
   * @property {boolean=} showPresentersInAgenda
   */
  constructor({
    showLocationInAgenda = false,
    showPresentersInAgenda = false,
  } = {}) {
    this.showLocationInAgenda = showLocationInAgenda
    this.showPresentersInAgenda = showPresentersInAgenda
  }
}
