import { initialState } from './groupBookingInitialState'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { parseSessionCapacity } from 'SVUtils/booking/parseSessionCapacity'
import { useBookingLists } from 'SVHooks/booking/useBookingLists'
import { useGroupCounts } from 'SVHooks/booking/useGroupCounts'

/**
 * Builds the initial state of the reducer, depending on the session input
 * @param {import('SVModels/Session').Session} props.session - the session object currently used in the group booking UI
 * @return {Object} the initial state of the group booking reducer
 */
export const useInitialState = session => {
  const attendees = useStoreItems('attendees')

  const [ initialBookedIds, initialWaitIds ] = useBookingLists(
    session,
    attendees,
    initialCapacityExceedsNeed
  )

  // determine if the capacity of the session is greater than the number
  // of attendees who can be booked. Factors in restricted attendees
  // and possible time conflicts with other sessions
  const { initialCapacityExceedsNeed } = useGroupCounts(session)

  const { remainingCount } = parseSessionCapacity(session?.capacity)
  const lists = {
    bookingList: initialBookedIds,
    waitingList: initialWaitIds,
  }

  return {
    ...initialState,
    session,
    capacity: remainingCount,
    init: lists,
    current: lists,
    useWaitingList: session.capacity.isWaitingListAvailable,
    showCapacity: !session.capacity.isUnlimited && !initialCapacityExceedsNeed,
    initialized: true,
  }
}
