import React, { useMemo, useReducer, useContext } from 'react'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { parseSessionCapacity } from 'SVUtils/booking/parseSessionCapacity'
import { useBookingLists } from 'SVHooks/booking/useBookingLists'
import { validate, isObj, isStr, isFunc, areSetEqual } from '@keg-hub/jsutils'

const initialState = {
  initialized: false,
  session: null,
  capacity: null,
  showCapacity: true,

  // Lists as they were upon initialization. These
  // do not change and are used to determine
  // if a current list is modified from the original
  init: {
    waitingList: [],
    bookingList: [],
  },

  // the current booking and waiting lists of attendee ids, which
  // could be requested for booking
  current: {
    bookingList: [],
    waitingList: [],
  },

  // bools indicating if the current booking and waiting lists
  // are modified from their original states
  modified: {
    bookingList: false,
    waitingList: false,
  },
}

/**
 *
 * @param {*} state
 * @param {*} key
 */
const setInState = (state, key, value) => ({
  ...state,
  [key]: value,
})

const updateList = (state, listKey, attendeeId, updateFn) => {
  const [valid] = validate(
    { state, listKey, attendeeId, updateFn },
    { state: isObj, listKey: isStr, attendeeId: isStr, updateFn: isFunc }
  )
  if (!valid) return state

  const originalList = state.init[listKey]
  const currentList = state.current[listKey]
  const nextList = updateFn(currentList, attendeeId)

  const modified =
    nextList !== currentList && !areSetEqual(nextList, originalList)
  const capacityDiff = currentList.length - nextList.length
  const nextCapacity =
    state.showCapacity && listKey !== 'waitingList'
      ? state.capacity + capacityDiff
      : state.capacity

  return {
    ...state,
    capacity: nextCapacity,
    current: {
      ...state.current,
      [listKey]: nextList,
    },
    modified: {
      ...state.modified,
      [listKey]: modified,
    },
  }
}

const addToList = (state, listKey, attendeeId) =>
  updateList(state, listKey, attendeeId, (currentList, id) =>
    !currentList.includes(id) ? [ ...currentList, id ] : currentList
  )

const removeFromList = (state, listKey, attendeeId) =>
  updateList(state, listKey, attendeeId, (currentList, id) =>
    currentList.includes(id)
      ? currentList.filter(attendeeID => attendeeID !== id)
      : currentList
  )

// const addToList = (state, listKey, attendeeId) => {
//   console.log('adding to', listKey)
//   const [valid] = validate(
//     { state, listKey, attendeeId },
//     { state: isObj, listKey: isStr, attendeeId: isStr }
//   )
//   if (!valid) return state

//   const originalList = state.init[listKey]
//   const currentList = state.current[listKey]
//   const nextList = !currentList.includes(attendeeId)
//     ? [ ...currentList, attendeeId ]
//     : currentList

//   const listWasChanged = nextList !== currentList
//   const modified = listWasChanged && !areSetEqual(nextList, originalList)
//   const capacityDiff = currentList.length - nextList.length
//   const nextCapacity = state.showCapacity && listKey !== 'waitingList' ? state.capacity + capacityDiff : state.capacity

//   return stateWithNextList(state, nextCapacity, listKey, nextList, modified)
// }

// const removeFromList = (state, listKey, attendeeId) => {
//   console.log('removing from ', listKey)
//   const [valid] = validate(
//     { state, listKey, attendeeId },
//     { state: isObj, listKey: isStr, attendeeId: isStr }
//   )
//   if (!valid) return state

//   const originalList = state.init[listKey]
//   const currentList = state.current[listKey]
//   const nextList = currentList.includes(attendeeId)
//     ? currentList.filter(attId => attId !== attendeeId)
//     : currentList

//   const listWasChanged = nextList !== currentList
//   const modified = listWasChanged && !areSetEqual(nextList, originalList)
//   const capacityDiff = currentList.length - nextList.length
//   const nextCapacity = state.showCapacity && listKey !== 'waitingList' ? state.capacity + capacityDiff : state.capacity

//   return stateWithNextList(state, nextCapacity, listKey, nextList, modified)
// }

const isInitialized = state => isObj(state) && Boolean(state.initialized)

const updateSessionBooking = (state, id) => {
  const [valid] = validate({ state, id }, { state: isInitialized, id: isStr })
  if (!valid) return state

  const shouldUseWaitingList = state.useWaitingList && state.capacity <= 0

  if (state.current.waitingList.includes(id)) {
    return removeFromList(state, 'waitingList', id)
  }
  else if (state.current.bookingList.includes(id)) {
    return removeFromList(state, 'bookingList', id)
  }
  else if (shouldUseWaitingList && !state.current.waitingList.includes(id)) {
    return addToList(state, 'waitingList', id)
  }
  else if (!shouldUseWaitingList && !state.current.bookingList.includes(id)) {
    return addToList(state, 'bookingList', id)
  }
}

export const groupBookingReducer = (state = initialState, action) => {
  const { type, value } = action

  switch (type) {
  case 'UPDATE_SESSION_BOOKING':
    return updateSessionBooking(state, value)
  case 'SET_MODIFIED':
    return setInState(state, 'modified', state)
  }
}

export const GroupBookingContext = React.createContext()
export const useGroupBookingContext = () => useContext(GroupBookingContext)

const useInitialState = (session, initialCapacityExceedsNeed) => {
  const attendees = useStoreItems('attendees')
  const [ initialBookedIds, initialWaitIds ] = useBookingLists(
    session,
    attendees,
    initialCapacityExceedsNeed
  )

  return useMemo(() => {
    const { remainingCount } = parseSessionCapacity(session?.capacity)
    const state = {
      bookingList: initialBookedIds,
      waitingList: initialWaitIds,
    }
    return {
      ...initialState,
      session,
      capacity: remainingCount,
      init: state,
      current: state,
      useWaitingList: session.capacity.isWaitingListAvailable,
      showCapacity:
        !session.capacity.isUnlimited && !initialCapacityExceedsNeed,
      initialized: true,
    }
  }, [ initialBookedIds, initialWaitIds ])
}

const useActions = dispatch =>
  useMemo(
    () => ({
      updateSessionBooking: ({ id }) =>
        dispatch({ type: 'UPDATE_SESSION_BOOKING', value: id }),
      setCapacity: capacity =>
        dispatch({ type: 'SET_CAPACITY', value: capacity }),
    }),
    [dispatch]
  )

export const GroupBookingProvider = ({
  session,
  initialCapacityExceedsNeed,
  children,
}) => {
  const initialState = useInitialState(session, initialCapacityExceedsNeed)
  const [ state, dispatch ] = useReducer(groupBookingReducer, initialState)
  const actions = useActions(dispatch)
  const contextValue = useMemo(() => ({ state, actions }), [ state, actions ])

  return (
    <GroupBookingContext.Provider value={contextValue}>
      { children }
    </GroupBookingContext.Provider>
  )
}
