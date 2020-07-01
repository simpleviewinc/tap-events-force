import { AgendaSettings } from './agendaSettings'
import { assignDefinedProps } from 'SVUtils'
/**
 * SessionAgendaProps class model
 */
export class SessionAgendaProps {
  settings = new AgendaSettings()
  presenters = []
  labels = []
  locations = []
  sessions = []
  attendees = []

  /**
   * @property {AgendaSettings} settings - id of session
   * @property {Array.<import('./presenter').presenter>} presenters - list of presenters
   * @property {Array.<import('./label').label>} labels - list of labels
   * @property {Array.<import('./location').location>} locations - list of locations
   * @property {Array.<import('./session').session>} sessions - list of sessions
   * @property {Array.<import('./attendee').attendee>} attendees - list of attendees
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
