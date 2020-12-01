import React, { useEffect, useRef, useMemo } from 'react'
import { Sessions } from 'SVComponents/sessions'
import { Loading } from 'SVComponents'
import { initSessions } from 'SVActions'
import { useSelector } from 'react-redux'
import { ModalContext } from 'SVComponents/modals/modalContext'

import { checkCall } from '@keg-hub/jsutils'
const ModalContextProvider = ({ component, children }) => {
  const closeModalRef = useRef()

  const providerValue = useMemo(
    () => ({
      ModalComponent: component,
      setCloseModal: closeFn => (closeModalRef.current = closeFn),
      closeModal: () => checkCall(closeModalRef.current),
    }),
    [ closeModalRef, component ]
  )

  return (
    <ModalContext.Provider value={providerValue}>
      { children }
    </ModalContext.Provider>
  )
}

/**
 * Container for Sessions
 * @param {Object} props
 * @param {Object} props.sessionAgendaProps - data structured like src/mocks/eventsforce/testData
 * @param {Function} props.onDayChange - function that executes when user changes day of agenda
 * @param {Function} props.onSessionBookingRequest - callback for session booking request action.
 *                                                 - passes back session id and an array of attendee ids
 * @param {Function} props.onSessionWaitingListRequest - callback for session waiting list request action,
 *                                                 - of form (sessionId, attendeeIds) => {}
 *                                                  - passes back session id and an array of attendee ids
 * @param {Function} props.ModalComponent - React component or function to allow rendering content in a modal
 *
 */
export const SessionsContainer = props => {
  const {
    onDayChange,
    onSessionBookingRequest,
    onSessionWaitingListRequest,
    sessionAgendaProps,
    ModalComponent,
  } = props

  useEffect(() => void initSessions(), [])

  const isReady = useSelector(store => store.tap?.initialized)

  return isReady ? (
    <ModalContextProvider component={ModalComponent}>
      <Sessions
        onDayChange={onDayChange}
        sessionAgendaProps={sessionAgendaProps}
        onSessionBookingRequest={onSessionBookingRequest}
        onSessionWaitingListRequest={onSessionWaitingListRequest}
      />
    </ModalContextProvider>
  ) : (
    <Loading />
  )
}
