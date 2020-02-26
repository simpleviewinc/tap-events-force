import React, { useState, useEffect } from 'react'
import { theme } from 'SVTheme'
import { SafeAreaView, StatusBar } from 'react-native'
import { ReThemeProvider, getDefaultTheme, setDefaultTheme } from 're-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { Router } from 'SVComponents/router'
import { checkCall, get } from 'jsutils'
import { ContainerRoutes } from 'SVNavigation/containerRoutes'
import { keg } from 'SVConfig'
import { getHistory } from 'SVNavigation'
import { isNative } from 'SVUtils/platform'

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
  console.log({activeTheme})
  return init && (
    <>
      { isNative() && <SafeAreaView style={{backgroundColor:get(activeTheme, 'colors.surface.primary.colors.dark')}}/>}
      <StatusBar barStyle={'default'} />
      <Router history={getHistory()}>
        <SafeAreaView>
          <Provider store={getStore()}>
            <ReThemeProvider theme={{}} merge={true}>
              {/* setup routes from navigation config */}
              <ContainerRoutes navigationConfigs={keg.routes}/>
            </ReThemeProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  )
}

export default App
