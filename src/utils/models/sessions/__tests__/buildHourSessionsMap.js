import { buildHourSessionsMap } from '../buildHourSessionsMap'
import testData from '../../../../mocks/eventsforce/testData'
import { mapObj } from '@ltipton/jsutils'

describe('buildHourSessionsMap', () => {
  it('should filter on day 1', () => {
    const map = buildHourSessionsMap(testData.sessions, 1)
    expect(map['09:00'].length).toEqual(1)
    expect(map['13:00'].length).toEqual(1)
  })

  it('should return the map with empty array for values', () => {
    const map = buildHourSessionsMap([], 1)
    mapObj(map, (_, val) => {
      expect(val).toEqual([])
    })
  })
})
