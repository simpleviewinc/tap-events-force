import React, { useMemo, useReducer } from 'react'
import { groupBookingReducer } from './groupBookingReducer'
import { GroupBookingContext } from './groupBookingContext'
import { useInitialState } from './useInitialState'
import { GroupBookingActionTypes } from './groupBookingActionTypes'

/**
 * @param {Function} dispatch - dispatch function
 * @return {Object} - memoized action functions
 */
const useActions = dispatch =>
  useMemo(
    () => ({
      /**
       * Updates the booking or waiting list with the attendee id `id`. Adds
       * or removes the attendee to one of those lists, depending on the list
       * that currently contains it, if any, and if the waiting list is available.
       *
       * Also updates state.capacity and state.modified.* depending on how
       * a list was updated.
       *
       * @param {Object} params
       * @param {string} params.id - attendee id
       */
      updateSessionBooking: ({ id }) => {
        dispatch({
          type: GroupBookingActionTypes.UPDATE_SESSION_BOOKING,
          value: id,
        })
      },
    }),
    [dispatch]
  )

/**
 * The context-provider for the group booking state. Provides access to the state object and actions
 * for submitting mutations. Use this, rather than the GroupBookingContext.Provider directly,
 * to ensure that the state is initialized for consumption.
 *
 * @param {Object} props
 * @param {import('SVModels/Session').Session} props.session - the session object currently used in the group booking UI
 * @param {*} props.children - children
 */
export const GroupBookingProvider = ({ session, children }) => {
  const initialState = useInitialState(session)

  const [ state, dispatch ] = useReducer(groupBookingReducer, initialState)
  const actions = useActions(dispatch)

  const contextValue = useMemo(() => ({ state, actions }), [ state, actions ])

  return (
    <GroupBookingContext.Provider value={contextValue}>
      { children }
    </GroupBookingContext.Provider>
  )
}
