import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { ReThemeProvider, getDefaultTheme } from 're-theme'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { AppContainer } from 'SVContainers'
import { Router } from 'SVComponents'
import { checkCall, get } from 'jsutils'
import 'SVTheme'

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
            <ReThemeProvider theme={activeTheme} merge={false}>
              <AppContainer switchTheme={ switchTheme } />
            </ReThemeProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  )
}

export default App
