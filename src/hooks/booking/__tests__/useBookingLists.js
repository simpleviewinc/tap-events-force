import { renderHook } from '@testing-library/react-hooks'
import testData from '../../../mocks/eventsforce/testData'
import { deepMerge } from '@keg-hub/jsutils'

const mocks = {
  useIsAttendeeDisabledCallback: () => () => false,
}

const reactMocks = {
  useMemo: (...args) => args[0](),
}

jest.setMock('SVHooks/models/attendees/useIsAttendeeDisabledCallback', mocks)
jest.setMock('react', reactMocks)

const useBookingLists = (...args) =>
  require('../useBookingLists').useBookingLists(...args)

const limitedSession = testData.sessions.find(
  session => session.identifier === '3'
)

const preSelectedSession = testData.sessions.find(
  session => session.identifier === '8'
)

const noWaitingListSession = deepMerge(limitedSession, {
  capacity: {
    isWaitingListAvailable: false,
  },
})

const allAttendeeIds = testData.attendees.map(att => att.bookedTicketIdentifier)

describe('useBookingLists', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  afterEach(() => {
    mocks.useIsAttendeeDisabledCallback = () => () => false
  })

  it('should pre-book all attendees when session capacity is unlimited and no attendees are on booking lists', () => {
    const { result } = renderHook(() =>
      useBookingLists(preSelectedSession, testData.attendees, true)
    )

    const [ bookingList, waitingList ] = result.current

    expect(bookingList).toEqual(expect.arrayContaining(allAttendeeIds))
    expect(waitingList.length).toEqual(0)
  })

  it('should pre-book all attendees when session capacity is unlimited', () => {
    const attendeesWithoutBookings = testData.attendees.map(att => ({
      ...att,
      bookedSessions: [],
    }))
    const { result } = renderHook(() =>
      useBookingLists(preSelectedSession, attendeesWithoutBookings, true)
    )

    const [ bookingList, waitingList ] = result.current

    expect(bookingList).toEqual(expect.arrayContaining(allAttendeeIds))
    expect(waitingList.length).toEqual(0)
  })

  it('should not pre-book any attendees with time conflicts', () => {
    const { result } = renderHook(() =>
      useBookingLists(preSelectedSession, testData.attendees, true)
    )

    const [ bookingList, waitingList ] = result.current

    expect(bookingList).toEqual(expect.arrayContaining(['3']))
    expect(waitingList.length).toEqual(0)
  })

  it('should return attendees reflecting existing state, when capacity is limited', () => {
    const { result } = renderHook(() =>
      useBookingLists(limitedSession, testData.attendees, true)
    )

    const [ bookingList, waitingList ] = result.current

    expect(waitingList.length).toEqual(1)
    expect(bookingList.length).toEqual(3)
  })

  it('should put nobody on the waiting list if it is not available', () => {
    const { result } = renderHook(() =>
      useBookingLists(noWaitingListSession, testData.attendees, false)
    )

    const [ bookingList, waitingList ] = result.current
    expect(waitingList.length).toEqual(0)
    expect(bookingList.length).toEqual(3)
  })

  it('should not book all attendees if capacity > need and waiting list is empty but booking list is not empty', () => {
    const capacityExceedsNeed = true

    const session = {
      allowBooking: true,
      identifier: 'x',
      dayNumber: 2,
      startDateTimeLocal: '2020-08-04 09:00:00',
      endDateTimeLocal: '2020-08-04 09:30:00',
      presenterIdentifiers: [],
      labelIdentifiers: [ '3', '4' ],
      locationIdentifier: '2',
      restrictToAttendeeCategories: [ '1', '2' ],
      capacity: {
        isUnlimited: false,
        remainingPlaces: 10000,
        isWaitingListAvailable: false,
      },
    }

    const attendees = [
      {
        bookedTicketIdentifier: '1',
        attendeeCategoryIdentifier: '1',
        bookedDays: [2],
        bookedSessions: [session.identifier],
      },
      {
        bookedTicketIdentifier: '2',
        attendeeCategoryIdentifier: '2',
        bookedDays: [2],
        bookedSessions: [],
      },
    ]

    const { result } = renderHook(() =>
      useBookingLists(session, attendees, capacityExceedsNeed)
    )

    const [ bookingList, waitingList ] = result.current
    expect(waitingList.length).toEqual(0)
    expect(bookingList.length).not.toEqual(attendees.length)
  })

  it('should not pre-book any attendees who are restricted', () => {
    mocks.useIsAttendeeDisabledCallback = () => () => true
    const capacityExceedsNeed = true
    const { result } = renderHook(() =>
      useBookingLists(limitedSession, testData.attendees, capacityExceedsNeed)
    )

    const [ bookingList, waitingList ] = result.current
    expect(waitingList.length).toEqual(0)
    expect(bookingList.length).toEqual(0)
  })
})
