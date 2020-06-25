import { deepFreeze } from 'jsutils'
import { agendaSettings } from './agendaSettings'

/**
 * sessionAgendaProps object
 * props coming from events force
 * @typedef sessionAgendaProps
 * @type {object}
 * @property {agendaSettings} settings - id of session
 * @property {Array.<import('./presenter').presenter>} presenters - list of presenters
 * @property {Array.<import('./label').label>} labels - list of labels
 * @property {Array.<import('./location').location>} locations - list of locations
 * @property {Array.<import('./session').session>} sessions - list of sessions
 * @property {Array.<import('./attendee').attendee>} attendees - list of attendees
 */
/** @type {sessionAgendaProps} */
export const sessionAgendaProps = deepFreeze({
  settings: {
    ...agendaSettings,
  },
  presenters: [],
  labels: [],
  locations: [],
  sessions: [],
  attendees: [],
})
