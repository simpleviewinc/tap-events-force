import { initialState } from '../groupBookingInitialState'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { parseSessionCapacity } from 'SVUtils/booking/parseSessionCapacity'
import { useBookingLists } from 'SVHooks/booking/useBookingLists'
import { useGroupCounts } from 'SVHooks/booking/useGroupCounts'
import { areSetEqual } from '@keg-hub/jsutils'

/**
 * Builds the initial state of the reducer, depending on the session input
 * @param {import('SVModels/Session').Session} props.session - the session object currently used in the group booking UI
 * @return {Object} the initial state of the group booking reducer
 */
export const useInitialBookingState = session => {
  const attendees = useStoreItems('attendees')

  // determine if the capacity of the session is greater than the number
  // of attendees who can be booked. Factors in restricted attendees
  // and possible time conflicts with other sessions
  const { initialCapacityExceedsNeed } = useGroupCounts(session)

  const [
    bookingList,
    waitingList,
    initBookingList,
    initWaitingList,
  ] = useBookingLists(session, attendees, initialCapacityExceedsNeed)

  const { remainingCount } = parseSessionCapacity(session?.capacity)

  return {
    ...initialState,
    capacity: remainingCount,
    current: { bookingList, waitingList },
    init: {
      bookingList: initBookingList,
      waitingList: initWaitingList,
    },
    initialized: true,
    modified: {
      ...initialState.modified,
      bookingList: !areSetEqual(bookingList, initBookingList),
    },
    session,
    showCapacity:
      !session?.capacity?.isUnlimited && !initialCapacityExceedsNeed,
  }
}
