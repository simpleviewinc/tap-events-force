import { SessionCapacity } from './sessionCapacity'

/*
 * Session class model
 */
export class Session {
  /**
   * @param {object=} props
   * @property {string=} identifier - session id
   * @property {string=} name - name of session
   * @property {string=} summary - summary of the session
   * @property {number=} dayNumber
   * @property {string=} startDateTimeLocal - In the time zone of the event E.g. "2020-08-03 14:40:00"
   * @property {string}= endDateTimeLocal - In the time zone of the event E.g. "2020-08-03 14:40:00"
   * @property {Array<string>=} presenterIdentifiers
   * @property {Array<string>=} labelIdentifiers
   * @property {string=} locationIdentifier
   * @property {string=} requiresBooking - If true then all attendees must book this session
   * @property {string=} liveVideoUrl - Url for the live stream
   * @property {string=} recordedVideoUrl - Url for the recorded video
   * @property {import('SVModels/price').Price=} price - price object
   * @property {Array<string>=} restrictToAttendeeCategories
   * @property {SessionCapacity=} capacity - session capacity
   */
  constructor({
    identifier = '',
    name = '',
    summary = '',
    dayNumber = 0,
    startDateTimeLocal = '',
    endDateTimeLocal = '',
    presenterIdentifiers = [],
    labelIdentifiers = [],
    locationIdentifier = '',
    requiresBooking = false,
    liveVideoUrl = '',
    recordedVideoUrl = '',
    price = null,
    restrictToAttendeeCategories = [],
    capacity = new SessionCapacity(),
  } = {}) {
    this.identifier = identifier
    this.name = name
    this.summary = summary
    this.dayNumber = dayNumber
    this.startDateTimeLocal = startDateTimeLocal
    this.endDateTimeLocal = endDateTimeLocal
    this.presenterIdentifiers = presenterIdentifiers
    this.labelIdentifiers = labelIdentifiers
    this.locationIdentifier = locationIdentifier
    this.requiresBooking = requiresBooking
    this.liveVideoUrl = liveVideoUrl
    this.recordedVideoUrl = recordedVideoUrl
    this.price = price
    this.restrictToAttendeeCategories = restrictToAttendeeCategories
    this.capacity = capacity
  }
}
