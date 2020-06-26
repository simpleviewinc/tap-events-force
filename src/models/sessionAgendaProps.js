import { AgendaSettings } from './agendaSettings'
/**
 * SessionAgendaProps class model
 */
export class SessionAgendaProps {
  /**
   * @param {agendaSettings} settings - id of session
   * @param {Array.<import('./presenter').presenter>} presenters - list of presenters
   * @param {Array.<import('./label').label>} labels - list of labels
   * @param {Array.<import('./location').location>} locations - list of locations
   * @param {Array.<import('./session').session>} sessions - list of sessions
   * @param {Array.<import('./attendee').attendee>} attendees - list of attendees
   */
  constructor(
    settings = new AgendaSettings(),
    presenters = [],
    labels = [],
    locations = [],
    sessions = [],
    attendees = []
  ) {
    this.settings = settings
    this.presenters = presenters
    this.labels = labels
    this.locations = locations
    this.sessions = sessions
    this.attendees = attendees
  }
}
