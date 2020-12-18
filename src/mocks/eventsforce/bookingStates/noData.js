import testData from '../testData'
import { omitKeys } from '@keg-hub/jsutils'

export const noData = {
  noSessions: omitKeys(testData, ['sessions']),
  noAttendees: omitKeys(testData, ['attendees']),
  noLabels: omitKeys(testData, ['labels']),
}
