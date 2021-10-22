import { getDisabled } from '../getDisabled'
import { conflict as mockData } from '../../../../mocks/eventsforce/bookingStates/conflict'
import { Values } from 'SVConstants'

const { SESSION_BOOKING_STATES } = Values

const singleMock = mockData.single
const groupMock = mockData.group

describe('getDisabled', () => {
  afterAll(() => jest.clearAllMocks())
  describe('GENERAL', () => {
    it('Should return TRUE if there is a different session awaiting the booking request', () => {
      const props = {
        pendingSession: {
          identifier: '1',
        },
        session: {
          identifier: '2',
        },
      }
      expect(getDisabled(props)).toBe(true)
    })

    it('Should return TRUE if session booking has been stopped', () => {
      const props = {
        session: {
          bookingStopped: true,
        },
      }
      expect(getDisabled(props)).toBe(true)
    })

    it('Should return FALSE if bookableCount DNE && (remainingPlaces OR waitingListAvailable exists)', () => {
      const props = {
        session: {
          allowBooking: true,
          capacity: {
            remainingPlaces: 5,
            isWaitingListAvailable: true,
          },
        },
      }
      const withRemainingPlaces = {
        session: {
          ...props.session,
          capacity: {
            remainingPlaces: 5,
          },
        },
      }
      const withWaitingList = {
        session: {
          ...props.session,
          capacity: {
            isWaitingListAvailable: true,
          },
        },
      }
      expect(getDisabled(props)).toBe(false)
      expect(getDisabled(withRemainingPlaces)).toBe(false)
      expect(getDisabled(withWaitingList)).toBe(false)
    })
  })

  describe('SINGLE', () => {
    it('Should return TRUE if no other attendees can book current session (bookableCount)', () => {
      const sessionLimited = {
        session: singleMock.limited.sessions[0],
        bookableCount: 0,
        bookingMode: 'single',
        timeConflicts: false,
      }
      const sessionUnlimited = {
        ...sessionLimited,
        session: singleMock.unlimited.sessions[0],
      }
      expect(getDisabled(sessionLimited)).toBe(true)
      expect(getDisabled(sessionUnlimited)).toBe(true)
    })

    it('Should return TRUE if current state is `SELECT` && there`s a time conflict', () => {
      const sessionLimited = {
        session: singleMock.limited.sessions[0],
        bookableCount: 1,
        bookingMode: 'single',
        timeConflicts: true,
      }
      const sessionUnlimited = {
        ...sessionLimited,
        session: singleMock.unlimited.sessions[0],
      }
      expect(getDisabled(sessionLimited, SESSION_BOOKING_STATES.SELECT)).toBe(
        true
      )
      expect(getDisabled(sessionUnlimited, SESSION_BOOKING_STATES.SELECT)).toBe(
        true
      )
    })
  })

  describe('GROUP', () => {
    it('Should return TRUE if no attendee can book it', () => {
      const sessionLimited = {
        session: groupMock.limited.sessions[0],
        bookableCount: 0,
        bookingMode: 'group',
      }
      const sessionUnlimited = {
        ...sessionLimited,
        session: groupMock.unlimited.sessions[0],
      }

      expect(getDisabled(sessionLimited)).toBe(true)
      expect(getDisabled(sessionUnlimited)).toBe(true)
    })

    it('Should return TRUE if session doesn`t allow booking', () => {
      const props = {
        session: {
          ...groupMock.limited.sessions[0],
          allowBooking: false,
        },
        bookableCount: 0,
        bookingMode: 'group',
      }

      expect(getDisabled(props)).toBe(true)
    })
  })

  it('Should return true if the capacity is full, but no attendees are booked', () => {
    const props = {
      session: {
        capacity: {
          remainingPlaces: 0,
        },
        allowBooking: true,
      },
      bookingList: [],
    }
    expect(getDisabled(props)).toBe(true)
  })

  it('Should return false if the capacity is full, but attendees are booked', () => {
    const props = {
      session: {
        capacity: {
          remainingPlaces: 0,
        },
        allowBooking: true,
      },
      bookingList: ['212'],
    }
    expect(getDisabled(props)).toBe(false)
  })
})
