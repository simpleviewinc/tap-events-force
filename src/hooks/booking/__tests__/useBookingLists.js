import { useBookingLists } from '../useBookingLists'
import { renderHook } from '@testing-library/react-hooks'
import testData from '../../../mocks/eventsforce/testData'

const unlimitedSession = testData.sessions.find(
  session => session.identifier === '1'
)

const limitedSession = testData.sessions.find(
  session => session.identifier === '3'
)

const allAttendeeIds = testData.attendees.map(att => att.bookedTicketIdentifier)

describe('useBookingLists', () => {
  it('should pre-book all attendees when session capacity is unlimited', () => {
    const { result } = renderHook(() =>
      useBookingLists(
        unlimitedSession,
        testData.attendees,
        _ => true,
        true,
        true
      )
    )

    const [ bookingList, waitingList ] = result.current

    expect(bookingList).toEqual(expect.arrayContaining(allAttendeeIds))
    expect(waitingList.length).toEqual(0)
  })

  it('should return attendees reflecting existing state, when capacity is limited', () => {
    const { result } = renderHook(() =>
      useBookingLists(limitedSession, testData.attendees, _ => true, true, true)
    )

    const [ bookingList, waitingList ] = result.current

    expect(waitingList.length).toEqual(1)
    expect(bookingList.length).toEqual(3)
  })

  it('should put nobody on the waiting list if it is not available', () => {
    const { result } = renderHook(() =>
      useBookingLists(
        limitedSession,
        testData.attendees,
        _ => true,
        false,
        false
      )
    )

    const [ bookingList, waitingList ] = result.current
    expect(waitingList.length).toEqual(0)
    expect(bookingList.length).toEqual(3)
  })

  it('should book all attendees if capacity > need and waiting list is empty', () => {
    const capacityExceedsNeed = true
    const { result } = renderHook(() =>
      useBookingLists(
        limitedSession,
        testData.attendees,
        _ => true,
        capacityExceedsNeed,
        false
      )
    )

    const [ bookingList, waitingList ] = result.current
    expect(waitingList.length).toEqual(0)
    expect(bookingList.length).toEqual(8)
  })

  it('should not pre-book any attendees who are restricted', () => {
    const capacityExceedsNeed = true
    const isBookable = _ => false
    const { result } = renderHook(() =>
      useBookingLists(
        limitedSession,
        testData.attendees,
        isBookable,
        capacityExceedsNeed,
        false
      )
    )

    const [ bookingList, waitingList ] = result.current
    expect(waitingList.length).toEqual(0)
    expect(bookingList.length).toEqual(0)
  })
})
