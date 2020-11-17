import React, { useMemo, useReducer, useCallback } from 'react'
import { groupBookingReducer } from './groupBookingReducer'
import { GroupBookingContext } from './groupBookingContext'
import { useInitialState } from './useInitialState'

const useActions = dispatch =>
  useMemo(
    () => ({
      updateSessionBooking: ({ id }) =>
        dispatch({ type: 'UPDATE_SESSION_BOOKING', value: id }),
    }),
    [dispatch]
  )

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
