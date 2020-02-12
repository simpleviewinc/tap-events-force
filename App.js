import React, { useState, useEffect } from 'react'
import { theme } from 'SVTheme'
import { SafeAreaView, StatusBar } from 'react-native'
import { ReThemeProvider, getDefaultTheme, setDefaultTheme } from 're-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { Router } from 'SVComponents'
import { checkCall, get } from 'jsutils'
import { ContainerRoutes } from 'SVNavigation'
import { keg } from 'SVConfig'
import { getHistory } from 'SVNavigation'

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
      <Router history={getHistory()}>
        <SafeAreaView>
          <Provider store={getStore()}>
            <ReThemeProvider theme={{}} merge={true}>
              {/* setup routes from navigation config */}
              <ContainerRoutes navigationConfigs={keg.navigation}/>
            </ReThemeProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  )
}

export default App
