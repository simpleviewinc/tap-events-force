import React, { useState } from 'react'
import { withAppHeader } from 'SVComponents'
import { SessionsContainer } from 'SVContainers'
import { displayName } from 'SVConfig'
import { H5 } from '@keg-hub/keg-components'
import testData from '../mocks/eventsforce/testData.json'
import { isNative } from 'SVUtils/platform/isNative'

const mockCallbacks = {
  onDayChange: day => console.log('Day changed to', day),
}

const marginStyle = {
  margin: 10,
}

/**
 * Root container for app Main.js
 * Currently only used in local development. Not exported by rollup (see apps/Sessions.js for that)
 */
export const RootContainer = withAppHeader(displayName, props => {
  const [ text, setText ] = useState(JSON.stringify(testData, null, 2))

  let mockData
  try {
    mockData = JSON.parse(text)
  }
  catch (error) {
    console.log('json syntax error. check your test data')
  }
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
        </>
      ) }

      <SessionsContainer
        {...mockData}
        {...mockCallbacks}
      />
    </>
  )
})
