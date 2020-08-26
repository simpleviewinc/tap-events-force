import React, { useEffect } from 'react'
import { Sessions } from 'SVComponents/sessions'
import { Loading } from 'SVComponents'
import { initSessions } from 'SVActions'
import { useSelector } from 'react-redux'
import testData from '../mocks/eventsforce/testData'

// test function to confirm that the onDayChange callback is called in the Sessions component
const testDayChangeCb = day => console.log('The day changed to ', day)

/**
 * Container for Sessions
 * @param {Object} props - session data, structured like src/mocks/eventsforce/testData
 */
export const SessionsContainer = props => {
  useEffect(() => void initSessions(), [])

  const isReady = useSelector(store => store.tap?.initialized)

  return isReady ? (
    <Sessions
      onDayChange={testDayChangeCb}
      sessionData={testData}
    />
  ) : (
    <Loading />
  )
}
