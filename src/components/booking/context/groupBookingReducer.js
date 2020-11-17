import { initialState } from './groupBookingInitialState'
import { validate, isObj, isStr, isFunc, areSetEqual } from '@keg-hub/jsutils'

const updateList = (state, listKey, updateFn) => {
  const [valid] = validate(
    { state, listKey, updateFn },
    { state: isObj, listKey: isStr, updateFn: isFunc }
  )
  if (!valid) return state

  const originalList = state.init[listKey]
  const currentList = state.current[listKey]
  const nextList = updateFn(currentList)

  const isModified =
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
      [listKey]: isModified,
    },
  }
}

const addToList = (state, listKey, attendeeId) =>
  updateList(state, listKey, currentList =>
    !currentList.includes(attendeeId)
      ? [ ...currentList, attendeeId ]
      : currentList
  )

const removeFromList = (state, listKey, attendeeId) =>
  updateList(state, listKey, currentList =>
    currentList.includes(attendeeId)
      ? currentList.filter(attId => attId !== attendeeId)
      : currentList
  )

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
  }
}
