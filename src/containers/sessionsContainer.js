import React, { useEffect } from 'react'
import { Sessions } from 'SVComponents/sessions'
import { Loading } from 'SVComponents'
import { initSessions } from 'SVActions'
import { useSelector } from 'react-redux'

/**
 * Container for Sessions
 * @param {Object} props
 * @param {Object} props.sessionData, structured like src/mocks/eventsforce/testData
 * @param {Function} props.onDayChange
 * @param {Function} props.onSessionBookingRequest - callback for session booking request action.
 *                                                  - passes back session id and an array of attendee ids
 */
export const SessionsContainer = props => {
  const { onDayChange, onSessionBookingRequest, sessionAgendaProps } = props

  useEffect(() => void initSessions(), [])

  const isReady = useSelector(store => store.tap?.initialized)

  return isReady ? (
    <Sessions
      onDayChange={onDayChange}
      sessionAgendaProps={sessionAgendaProps}
      onSessionBookingRequest={onSessionBookingRequest}
    />
  ) : (
    <Loading />
  )
}
