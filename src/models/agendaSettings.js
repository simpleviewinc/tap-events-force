import { deepFreeze } from 'jsutils'

/**
 * AgendaSettings object
 * @typedef agendaSettings
 * @type {object}
 * @property {boolean} showLocationInAgenda
 * @property {boolean} showPresentersInAgenda
 */
/** @type {agendaSettings} */
export const agendaSettings = deepFreeze({
  showLocationInAgenda: false,
  showPresentersInAgenda: false,
})
