import { AgendaSettings } from './agendaSettings'
import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'
/**
 * SessionAgendaProps class model
 */
export class SessionAgendaProps {
  agendaDays = []
  settings = new AgendaSettings()
  presenters = []
  labels = []
  locations = []
  sessions = []
  attendees = []
  alert = null

  /**
   * @param {object} params
   * @param {AgendaSettings} params.settings - id of session
   * @param {Array.<import('./presenter').Presenter>} params.presenters - list of presenters
   * @param {Array.<import('./agendaDay').AgendaDay>} params.agendaDay - list of agenda days
   * @param {Array.<import('./label').Label>} params.labels - list of labels
   * @param {Array.<import('./location').Location>} params.locations - list of locations
   * @param {Array.<import('./session').Session>} params.sessions - list of sessions
   * @param {Array.<import('./attendee').Attendee>} params.attendees - list of attendees
   * @param {import('./alert').Alert=} params.alert
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
