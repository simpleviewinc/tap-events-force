import { buildHourSessionsMap } from '../buildHourSessionsMap'
import testData from '../../../../mocks/eventsforce/testData'
import { mapObj } from '@keg-hub/jsutils'

describe('buildHourSessionsMap', () => {
  it('should filter on day 1', () => {
    const map = buildHourSessionsMap(testData.sessions, 1)
    expect(map[0].timeBlock).toEqual('09:00')
    expect(map[0].sessions.length).toEqual(1)

    expect(map[1].timeBlock).toEqual('13:00')
    expect(map[1].sessions.length).toEqual(1)
  })

  it('should return the map with empty array for values', () => {
    const map = buildHourSessionsMap([], 1)
    mapObj(map, (_, val) => {
      expect(val).toEqual([])
    })
  })
})
