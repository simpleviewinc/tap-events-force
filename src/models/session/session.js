import { deepFreeze } from 'jsutils'
import { sessionCapacity } from './sessionCapacity'

/**
 * session object
 * @typedef session
 * @type {object}
 * @property {string} identifier - session id
 * @property {string} name - name of session
 * @property {string} summary - summary of the session
 * @property {number} dayNumber
 * @property {string} startDateTimeLocal - In the time zone of the event E.g. "2020-08-03 14:40:00"
 * @property {string} endDateTimeLocal - In the time zone of the event E.g. "2020-08-03 14:40:00"
 * @property {Array<string>} presenterIdentifiers
 * @property {Array<string>} labelIdentifiers
 * @property {string} locationIdentifier
 * @property {string} requiresBooking - If true then all attendees must book this session
 * @property {string} liveVideoUrl - Url for the live stream
 * @property {string} recordedVideoUrl - Url for the recorded video
 * @property {import('SVModels/price').price} price - price object
 * @property {Array<string>} restrictToAttendeeCategories
 * @property {sessionCapacity} capacity - session capacity
 */
/** @type {session} */
export const session = deepFreeze({
  identifier: '',
  name: '',
  summary: '',
  dayNumber: 0,
  startDateTimeLocal: '',
  endDateTimeLocal: '',
  presenterIdentifiers: [],
  labelIdentifiers: [],
  locationIdentifier: '',
  requiresBooking: false,
  liveVideoUrl: '',
  recordedVideoUrl: '',
  price: null,
  restrictToAttendeeCategories: [],
  capacity: {
    ...sessionCapacity,
  },
})
