import React, { useState } from 'react'
import { theme } from 'SVTheme'
import {
  ReThemeProvider,
  getDefaultTheme,
  setDefaultTheme,
  setRNDimensions,
  setRNPlatform
} from '@svkeg/re-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { Sessions } from 'SVComponents/sessions'
import { Dimensions, Platform } from 'react-native'

setRNDimensions(Dimensions)
setRNPlatform(Platform)
setDefaultTheme(theme)

/**
 * The sessions app for events force. This is the entry point of the rollup build and root component 
 * exported by the build.
 * 
 * You can test this through the rollup bundle by running `yarn web:export`
 * 
 * @param {*} props - session data. @see src/mocks/eventsforce/testData 
 */
const SessionsApp = props => {
  const [ activeTheme ] = useState(getDefaultTheme())

  return (
    <Provider store={getStore()}>
      <ReThemeProvider theme={activeTheme}>
        {/* <SessionsContainer { ...props } /> */}
        <Sessions sessionData={props} />
      </ReThemeProvider>
    </Provider>
  )
}

export default SessionsApp
