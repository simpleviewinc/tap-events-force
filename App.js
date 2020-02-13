import React, { useState, useEffect } from 'react'
import { theme } from 'SVTheme'
import { SafeAreaView, StatusBar } from 'react-native'
import { ReThemeProvider, getDefaultTheme, setDefaultTheme } from 're-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { AppContainer } from 'SVContainers/app'
import { Router } from 'SVComponents'
import { checkCall, get } from 'jsutils'

setDefaultTheme(theme)

const checkAppInit = setInit => {
  setInit(true)
  checkCall(initAppAction)
}

const App = props => {
  const [ activeTheme, switchTheme ] = useState(getDefaultTheme())
  const [ init, setInit ] = useState(false)

  useEffect(() => {
    !init && checkAppInit(setInit)
  })

  return init && (
    <>
      <StatusBar barStyle={ get(activeTheme, [ 'components', 'statusBar', 'barStyle' ]) } />
      <Router>
        <SafeAreaView>
          <Provider store={getStore()}>
            <ReThemeProvider theme={{}} merge={true}>
              <AppContainer switchTheme={ switchTheme } />
            </ReThemeProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  )
}

export default App
