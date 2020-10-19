import { renderHook } from '@testing-library/react-hooks'
import testData from '../../../mocks/eventsforce/testData'
import { deepMerge } from '@keg-hub/jsutils'

const mocks = {
  useRestrictedAttendeeIds: () => ({ isBookable: () => true }),
}

const reactMocks = {
  useMemo: (...args) => args[0](),
}

jest.setMock('../useRestrictedAttendeeIds', mocks)
jest.setMock('react', reactMocks)

const useBookingLists = (...args) =>
  require('../useBookingLists').useBookingLists(...args)

const unlimitedSession = testData.sessions.find(
  session => session.identifier === '1'
)

const limitedSession = testData.sessions.find(
  session => session.identifier === '3'
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
    mocks.useRestrictedAttendeeIds = () => ({ isBookable: () => true })
  })

  it('should pre-book all attendees when session capacity is unlimited', () => {
    const { result } = renderHook(() =>
      useBookingLists(unlimitedSession, testData.attendees, true)
    )

    const [ bookingList, waitingList ] = result.current

    expect(bookingList).toEqual(expect.arrayContaining(allAttendeeIds))
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

  it('should book all attendees if capacity > need and waiting list is empty', () => {
    const capacityExceedsNeed = true
    const { result } = renderHook(() =>
      useBookingLists(
        noWaitingListSession,
        testData.attendees,
        capacityExceedsNeed
      )
    )

    const [ bookingList, waitingList ] = result.current
    expect(waitingList.length).toEqual(0)
    expect(bookingList.length).toEqual(8)
  })

  it('should not pre-book any attendees who are restricted', () => {
    mocks.useRestrictedAttendeeIds = () => ({ isBookable: () => false })
    const capacityExceedsNeed = true
    const { result } = renderHook(() =>
      useBookingLists(limitedSession, testData.attendees, capacityExceedsNeed)
    )

    const [ bookingList, waitingList ] = result.current
    expect(waitingList.length).toEqual(0)
    expect(bookingList.length).toEqual(0)
  })
})
