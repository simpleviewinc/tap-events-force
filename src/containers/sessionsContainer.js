import React, { useEffect } from 'react'
import { Sessions } from 'SVComponents/sessions'
import { Loading } from 'SVComponents'
import { initSessions } from 'SVActions'
import { useSelector } from 'react-redux'

/**
 * Container for Sessions
 * @param {Object} props
 * @param {Object} props.sessionData, structured like src/mocks/eventsforce/testData
 */
export const SessionsContainer = props => {
  const { onDayChange, ...sessionData } = props

  useEffect(() => void initSessions(), [])

  const isReady = useSelector(store => store.tap?.initialized)

  return isReady ? (
    <Sessions
      onDayChange={onDayChange}
      sessionData={sessionData}
      onSessionBookingRequest={data => {
        console.log(data)
      }}
    />
  ) : (
    <Loading />
  )
}
