import React, { useState } from 'react'
import { withAppHeader } from 'SVComponents'
import { SessionsContainer } from './sessionsContainer'
import { displayName } from 'SVConfig'
import { H5, Button } from '@keg-hub/keg-components'
import testData from '../mocks/eventsforce/testData.json'
import { isNative } from 'SVUtils/platform/isNative'

const mockCallbacks = {
  onDayChange: day => console.log('Day changed to', day),
}

const marginStyle = {
  margin: 10,
}

const buttonStyles = {
  main: {
    width: 200,
    ...marginStyle,
  },
}
/**
 * for testing purposes only
 * @todo - remove later
 * @param {string} text
 */
const applyJson = (text, setMockData) => {
  try {
    setMockData(JSON.parse(text))
  }
  catch (error) {
    console.log('json syntax error. check your test data')
  }
}
/**
 * Root container for app Main.js
 * Currently only used in local development. Not exported by rollup (see apps/Sessions.js for that)
 */
export const RootContainer = withAppHeader(displayName, props => {
  const [ text, setText ] = useState(JSON.stringify(testData, null, 2))
  const [ mockData, setMockData ] = useState(JSON.parse(text))
  return (
    <>
      { !isNative() && process.env.NODE_ENV === 'development' && (
        <>
          <H5 style={marginStyle}>Test Data (JSON)</H5>
          <textarea
            style={marginStyle}
            rows={5}
            value={text}
            onChange={event => setText(event.target.value)}
          />
          <Button
            themePath={'button.contained.primary'}
            styles={buttonStyles}
            onClick={() => applyJson(text, setMockData)}
            content={'Apply'}
          />
        </>
      ) }

      <SessionsContainer
        {...mockData}
        {...mockCallbacks}
      />
    </>
  )
})
