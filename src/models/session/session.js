import { SessionCapacity } from './sessionCapacity'
import { assignDefinedProps } from 'SVUtils/object/assignDefinedProps'

/**
 * Session class model
 */
export class Session {
  identifier = ''
  name = ''
  summary = ''
  dayNumber = 0
  startDateTimeLocal = ''
  endDateTimeLocal = ''
  presenterIdentifiers = []
  labelIdentifiers = []
  locationIdentifier = ''
  requiresBooking = false
  allowBooking = false
  liveVideoUrl = ''
  recordedVideoUrl = ''
  price = null
  restrictToAttendeeCategories = []
  capacity = new SessionCapacity()

  /**
   * @param {object} params
   * @param {string=} params.identifier - session id
   * @param {string=} params.name - name of session
   * @param {string=} params.summary - summary of the session
   * @param {number=} params.dayNumber
   * @param {string=} params.startDateTimeLocal - In the time zone of the event E.g. "2020-08-03 14:40:00"
   * @param {string=} params.endDateTimeLocal - In the time zone of the event E.g. "2020-08-03 14:40:00"
   * @param {Array<string>=} params.presenterIdentifiers
   * @param {Array<string>=} params.labelIdentifiers
   * @param {string=} params.locationIdentifier
   * @param {string=} params.requiresBooking - If true then all attendees must book this session
   * @param {string=} params.liveVideoUrl - Url for the live stream
   * @param {string=} params.recordedVideoUrl - Url for the recorded video
   * @param {import('SVModels/price').Price=} params.price - price object
   * @param {Array<string>=} params.restrictToAttendeeCategories
   * @param {SessionCapacity=} params.capacity - session capacity
   */
  constructor(params = {}) {
    assignDefinedProps(this, params)
  }
}
