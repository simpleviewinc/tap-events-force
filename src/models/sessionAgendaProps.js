import { AgendaSettings } from './agendaSettings'
/**
 * SessionAgendaProps class model
 */
export class SessionAgendaProps {
  /**
   * @param {object} props
   * @property {AgendaSettings} settings - id of session
   * @property {Array.<import('./presenter').presenter>} presenters - list of presenters
   * @property {Array.<import('./label').label>} labels - list of labels
   * @property {Array.<import('./location').location>} locations - list of locations
   * @property {Array.<import('./session').session>} sessions - list of sessions
   * @property {Array.<import('./attendee').attendee>} attendees - list of attendees
   */
  constructor({
    settings = new AgendaSettings(),
    presenters = [],
    labels = [],
    locations = [],
    sessions = [],
    attendees = [],
  } = {}) {
    this.settings = settings
    this.presenters = presenters
    this.labels = labels
    this.locations = locations
    this.sessions = sessions
    this.attendees = attendees
  }
}
