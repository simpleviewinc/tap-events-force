import React from 'react'
import { Sessions } from 'SVComponents'
import testData from '../mocks/eventsforce/testData'

// test function to confirm that the onDayChange callback is called in the Sessions component
const testDayChangeCb = day => console.log('The day changed to ', day)

export const SessionsContainer = props => {
  return <Sessions
    onDayChange={testDayChangeCb}
    sessionData={testData}
  />
}
