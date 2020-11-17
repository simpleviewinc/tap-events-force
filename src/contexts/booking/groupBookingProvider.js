import React, { useMemo, useReducer, useCallback } from 'react'
import { groupBookingReducer } from './groupBookingReducer'
import { GroupBookingContext } from './groupBookingContext'
import { useInitialState } from './useInitialState'

/**
 * @param {Function} dispatch - dispatch function
 * @return {Object} - memoized action functions
 */
const useActions = dispatch =>
  useMemo(
    () => ({
      updateSessionBooking: ({ id }) =>
        dispatch({ type: 'UPDATE_SESSION_BOOKING', value: id }),
    }),
    [dispatch]
  )

/**
 * @param {Object} state
 * @return {Object} - memoized getter functions
 */
const useGetters = state => {
  const { bookingList, waitingList } = state.current
  const isOnBookingList = useCallback(id => bookingList?.includes(id), [
    bookingList,
  ])
  const isOnWaitingList = useCallback(id => waitingList?.includes(id), [
    waitingList,
  ])
  return useMemo(() => ({ isOnBookingList, isOnWaitingList }), [
    isOnBookingList,
    isOnWaitingList,
  ])
}

/**
 * The context-provider for the group booking state. Provides access to the state object,
 * actions for submitting mutations, and getters for helper functions. Use this, rather than
 * GroupBookingContext.Provider, to ensure the state is initialized for consuming.
 * @param {Object} props
 * @param {import('SVModels/Session').Session} props.session - the session object currently used in the group booking UI
 * @param {*} props.children - children
 */
export const GroupBookingProvider = ({ session, children }) => {
  const initialState = useInitialState(session)

  const [ state, dispatch ] = useReducer(groupBookingReducer, initialState)
  const actions = useActions(dispatch)
  const getters = useGetters(state)

  const contextValue = useMemo(() => ({ state, actions, getters }), [
    state,
    actions,
    getters,
  ])

  return (
    <GroupBookingContext.Provider value={contextValue}>
      { children }
    </GroupBookingContext.Provider>
  )
}
