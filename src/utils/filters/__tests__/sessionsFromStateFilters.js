import testData from '../../../mocks/eventsforce/testData'
import { Label } from '../../../models/label'
import { setState, getStore, dispatch } from '../../../mocks'
import { Values } from 'SVConstants'

jest.setMock('SVStore', { getStore, dispatch })
const { sessionsFromStateFilters } = require('../sessionsFromStateFilters')
const { SESSION_BOOKING_STATES } = Values

describe('sessionsFromStateFilters', () => {
  afterAll(() => jest.clearAllMocks())
  beforeEach(() => {
    dispatch.mockClear()
    setState({
      attendees: testData.attendees,
      sessions: testData.sessions,
    })
  })

  it('should return 2 results when filtering by `waitingList` && `onWaitingList` label', () => {
    const labels = [
      new Label({
        identifier: 'WAITING_LIST',
        name: SESSION_BOOKING_STATES.WAITING_LIST,
      }),
      new Label({
        identifier: 'ON_WAITING_LIST',
        name: SESSION_BOOKING_STATES.ON_WAITING_LIST,
      }),
    ]

    const filteredSessions = sessionsFromStateFilters(labels, testData.sessions)
    expect(filteredSessions.length).toEqual(2)
  })

  it('should return original sessions list when filtering by an unused label', () => {
    const labels = [ 'z', 'y', 'x' ].map(str => new Label({ identifier: str }))

    const filteredSessions = sessionsFromStateFilters(labels, testData.sessions)
    expect(filteredSessions.length).toEqual(testData.sessions.length)
  })
})
