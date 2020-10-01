import { setState, getStore, dispatch } from '../../../../mocks'
import { Values } from 'SVConstants'

const { SESSION_BOOKING_STATES } = Values
jest.setMock('SVStore', { getStore, dispatch })
const { getBookingState } = require('../getBookingState')
const mockProps = {
  attendees: [
    {
      bookedTicketIdentifier: '1',
      name: 'Daniel Foo',
      bookedSessions: [],
    },
    {
      bookedTicketIdentifier: '2',
      name: 'Adam Foo',
      bookedSessions: [],
    },
    {
      bookedTicketIdentifier: '3',
      name: 'Dr Some guy',
      bookedSessions: [ '1', '3', '5' ],
    },
  ],
}

describe('getBookingState', () => {
  afterAll(() => jest.clearAllMocks())
  beforeEach(() => {
    dispatch.mockClear()
    setState(mockProps)
  })

  // it('should return read-only on sessions with allowBooking == false', () => {
  //   const testSession = {
  //     allowBooking: false,
  //     identifier: '1',
  //   }
  //   expect(getBookingState(testSession)).toEqual(SESSION_BOOKING_STATES.READ_ONLY)
  // })
  it('should return SELECTED on sessions where session.id exists in attendees.bookedSessions', () => {
    const testSession = {
      allowBooking: true,
      identifier: '3',
    }
    expect(getBookingState(testSession)).toEqual(
      SESSION_BOOKING_STATES.SELECTED
    )
  })
})
