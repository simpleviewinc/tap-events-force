import { initialState } from './groupBookingInitialState'
import { validate, isObj, isStr, isFunc, areSetEqual } from '@keg-hub/jsutils'

/**
 * Updates the list identified by listKey using the updateFn
 * @param {Object} state - state of group booking reducer
 * @param {string} listKey - key name of the list to update
 * @param {Function} updateFn - fn of form (currentList) => nextList, returning the next list to reduce to
 * @return {Object} - next state
 */
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

/**
 * Adds the attendeeId to the list
 * @param {Object} state - state of group booker
 * @param {string} listKey - key name of the list to add to
 * @param {string} attendeeId - attendee id to add
 * @return {Object} - next state
 */

const addToList = (state, listKey, attendeeId) =>
  updateList(state, listKey, currentList =>
    !currentList.includes(attendeeId)
      ? [ ...currentList, attendeeId ]
      : currentList
  )

/**
 * Removes the attendeeId from the list
 * @param {Object} state - state of group booker
 * @param {string} listKey - key name of the list to remove from
 * @param {string} attendeeId - attendee id to remove
 * @return {Object} - next state
 */

const removeFromList = (state, listKey, attendeeId) =>
  updateList(state, listKey, currentList =>
    currentList.includes(attendeeId)
      ? currentList.filter(attId => attId !== attendeeId)
      : currentList
  )

/**
 * Helper for updateSessionBooking
 * @param {Object} state - state of group booker
 * @return {boolean} true if the group booking reducer is initialized
 */
const isInitialized = state => isObj(state) && Boolean(state.initialized)

/**
 * Adds or removes the attendee identified by `id` from the current list
 * that contains it (either booking or waiting list). Also ensures that
 * the state's modified and capacity properties are updated accordingly.
 * @param {Object} state - state of group booker
 * @param {string} id - attendee id
 */
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

/**
 * Reducer function for the group booker
 * @param {Object} state - initial state for the reducer
 * @param {Object} action - action to dispatch
 * @param {string} action.type - type of action
 * @param {*} action.value - the payload, which depends on the action type
 */
export const groupBookingReducer = (state = initialState, action) => {
  const { type, value } = action

  switch (type) {
  case 'UPDATE_SESSION_BOOKING':
    return updateSessionBooking(state, value)
  }
}
