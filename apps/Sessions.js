import React, { useState } from 'react'
import { theme } from 'SVTheme'
import {
  ReThemeProvider,
  getDefaultTheme,
  setDefaultTheme,
  setRNDimensions,
  setRNPlatform
} from '@keg-hub/re-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { SessionsContainer } from 'SVContainers/sessionsContainer'
import { Dimensions, Platform } from 'react-native'

setRNDimensions(Dimensions)
setRNPlatform(Platform)
setDefaultTheme(theme)

/**
 * The sessions app for events force. This is the entry point of the 
 * rollup build and it is the root component exported by the build.
 * 
 * @param {*} props - session data, including callbacks, passed to SessionsContainer. @see src/mocks/eventsforce/testData 
 */
const SessionsApp = props => {
  const [ activeTheme ] = useState(getDefaultTheme())

  return (
    <Provider store={getStore()}>
      <ReThemeProvider theme={activeTheme}>
        <SessionsContainer { ...props } />
      </ReThemeProvider>
    </Provider>
  )
}

export default SessionsApp
