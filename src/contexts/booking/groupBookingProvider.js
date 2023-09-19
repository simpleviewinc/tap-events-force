import React, { useMemo, useReducer } from 'react'
import { groupBookingReducer } from './groupBookingReducer'
import { GroupBookingContext } from './groupBookingContext'
import { useInitialBookingState } from './hooks/useInitialBookingState'
import { updateSessionBooking } from './actions/updateSessionBooking'
import { checkAttendee } from './actions/checkAttendee'
import { uncheckAttendee } from './actions/uncheckAttendee'
import { reset } from './actions/reset'

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
  const initialState = useInitialBookingState(session)

  const [ state, dispatch ] = useReducer(groupBookingReducer, initialState)

  const actions = useMemo(
    () => ({
      updateSessionBooking: id => updateSessionBooking(dispatch, id),
      reset: () => reset(dispatch, initialState),
      selectAll: (attendees, isAttendeeDisabledCallback) => {
        attendees.forEach(attendee => {
          checkAttendee(
            dispatch,
            attendee.bookedTicketIdentifier,
            isAttendeeDisabledCallback
          )
        })
      },
      selectNone: attendees => {
        attendees.forEach(attendee => {
          uncheckAttendee(dispatch, attendee.bookedTicketIdentifier)
        })
      },
    }),
    [ dispatch, initialState ]
  )

  const contextValue = useMemo(() => ({ state, actions }), [ state, actions ])

  return (
    <GroupBookingContext.Provider value={contextValue}>
      { children }
    </GroupBookingContext.Provider>
  )
}
