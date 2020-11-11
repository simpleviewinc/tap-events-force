import React, { useEffect } from 'react'
import { Sessions } from 'SVComponents/sessions'
import { Loading } from 'SVComponents'
import { initSessions } from 'SVActions'
import { useSelector } from 'react-redux'
import { ModalContext } from 'SVComponents/modals/modalContext'

/**
 * Container for Sessions
 * @param {Object} props
 * @param {Object} props.sessionAgendaProps - data structured like src/mocks/eventsforce/testData
 * @param {Function} props.onDayChange - function that executes when user changes day of agenda
 * @param {Function} props.onSessionBookingRequest - callback for session booking request action.
 *                                                 - passes back session id and an array of attendee ids
 * @param {Function} props.onSessionWaitingListRequest - callback for session waiting list request action,
 *                                                 - of form (sessionId, attendeeIds) => {}
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
    <ModalContext.Provider value={ModalComponent}>
      <Sessions
        onDayChange={onDayChange}
        sessionAgendaProps={sessionAgendaProps}
        onSessionBookingRequest={onSessionBookingRequest}
        onSessionWaitingListRequest={onSessionWaitingListRequest}
      />
    </ModalContext.Provider>
  ) : (
    <Loading />
  )
}
