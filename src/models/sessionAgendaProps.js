import { AgendaSettings } from './agendaSettings'
import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'
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
   * @param {object} params
   * @param {AgendaSettings} params.settings - id of session
   * @param {Array.<import('./presenter').presenter>} params.presenters - list of presenters
   * @param {Array.<import('./label').label>} params.labels - list of labels
   * @param {Array.<import('./location').location>} params.locations - list of locations
   * @param {Array.<import('./session').session>} params.sessions - list of sessions
   * @param {Array.<import('./attendee').attendee>} params.attendees - list of attendees
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
