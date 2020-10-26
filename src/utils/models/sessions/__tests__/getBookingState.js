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
      waitingListSessions: ['3'],
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

  describe('READ_ONLY', () => {
    it('should return read-only on sessions with allowBooking == false', () => {
      const testSession = {
        allowBooking: false,
        identifier: '1',
      }
      expect(getBookingState(testSession)).toEqual(
        SESSION_BOOKING_STATES.READ_ONLY
      )
    })
    it('should ALWAYS return READ_ONLY regardless of any other condition if allowBooking === false', () => {
      // this edge case should never happen in a real scenario
      // if allowBooking = true, this would return ON WAITING LIST
      const testSession = {
        allowBooking: false,
        identifier: '3',
      }
      expect(getBookingState(testSession)).toEqual(
        SESSION_BOOKING_STATES.READ_ONLY
      )
    })
  })

  describe('SELECTED', () => {
    it('should return SELECTED on sessions where session.identifier exists in any attendee.bookedSessions but NOT attendee.waitingListSessions', () => {
      const testSessions = [
        {
          allowBooking: true,
          identifier: '1',
        },
        {
          allowBooking: true,
          identifier: '5',
        },
      ]
      testSessions.map(session => {
        expect(getBookingState(session)).toEqual(
          SESSION_BOOKING_STATES.SELECTED
        )
      })
    })
  })

  describe('ON_WAITING_LIST', () => {
    it('should return ON_WAITING_LIST on sessions where session.identifier exists in any attendee.waitingListSessions', () => {
      const testSessions = [
        {
          allowBooking: true,
          identifier: '3',
        },
      ]
      testSessions.map(session => {
        expect(getBookingState(session)).toEqual(
          SESSION_BOOKING_STATES.ON_WAITING_LIST
        )
      })
    })
  })

  describe('SELECT', () => {
    it('should return SELECT on sessions no attendee has booked or on waiting list AND has the capacity to do so', () => {
      const testSessions = [
        {
          allowBooking: true,
          identifier: '500',
          capacity: {
            isUnlimited: true,
          },
        },
        {
          allowBooking: true,
          identifier: '999',
          capacity: {
            isUnlimited: false,
            remainingPlaces: 1,
          },
        },
      ]
      testSessions.map(session => {
        expect(getBookingState(session)).toEqual(SESSION_BOOKING_STATES.SELECT)
      })
    })
  })

  describe('WAITING_LIST', () => {
    it('should return WAITING_LIST on sessions no attendee has booked or on waiting list AND limited capacity + no remaining places + waitingList enabled', () => {
      const testSessions = [
        {
          allowBooking: true,
          identifier: '500',
          capacity: {
            isWaitingListAvailable: true,
          },
        },
        {
          allowBooking: true,
          identifier: '999',
          capacity: {
            isUnlimited: false,
            remainingPlaces: 0,
            isWaitingListAvailable: true,
          },
        },
      ]
      testSessions.map(session => {
        expect(getBookingState(session)).toEqual(
          SESSION_BOOKING_STATES.WAITING_LIST
        )
      })
    })
  })

  describe('FULLY_BOOKED', () => {
    it('should return FULLY_BOOKED on sessions no attendee has booked or on waiting list AND limited capacity + no remaining places + waitingList DISABLED', () => {
      const testSessions = [
        {
          allowBooking: true,
          identifier: '500',
          capacity: {
            isWaitingListAvailable: false,
          },
        },
        {
          allowBooking: true,
          identifier: '999',
          capacity: {
            isUnlimited: false,
            remainingPlaces: 0,
            isWaitingListAvailable: false,
          },
        },
      ]
      testSessions.map(session => {
        expect(getBookingState(session)).toEqual(
          SESSION_BOOKING_STATES.FULLY_BOOKED
        )
      })
    })
  })
})
