import React, { useState } from 'react'
import { theme } from 'SVTheme'
import {
  ReThemeProvider,
  getDefaultTheme,
  setDefaultTheme
} from '@simpleviewinc/re-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { SessionsContainer } from 'SVContainers/sessionsContainer'

setDefaultTheme(theme)

const App = props => {

  const [ activeTheme ] = useState(getDefaultTheme())

  return (
    <Provider store={getStore()}>
      <ReThemeProvider theme={activeTheme}>
        <SessionsContainer { ...props } />
      </ReThemeProvider>
    </Provider>
  )

}

export default App
