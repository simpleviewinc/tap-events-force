import { SessionCapacity } from './sessionCapacity'

/*
 * Session class model
 */
export class Session {
  /**
   * @param {string=} identifier - session id
   * @param {string=} name - name of session
   * @param {string=} summary - summary of the session
   * @param {number=} dayNumber
   * @param {string=} startDateTimeLocal - In the time zone of the event E.g. "2020-08-03 14:40:00"
   * @param {string}= endDateTimeLocal - In the time zone of the event E.g. "2020-08-03 14:40:00"
   * @param {Array<string>=} presenterIdentifiers
   * @param {Array<string>=} labelIdentifiers
   * @param {string=} locationIdentifier
   * @param {string=} requiresBooking - If true then all attendees must book this session
   * @param {string=} liveVideoUrl - Url for the live stream
   * @param {string=} recordedVideoUrl - Url for the recorded video
   * @param {import('SVModels/price').Price=} price - price object
   * @param {Array<string>=} restrictToAttendeeCategories
   * @param {SessionCapacity=} capacity - session capacity
   */
  constructor(
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
    capacity = new SessionCapacity()
  ) {
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
