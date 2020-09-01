import React, { useState, useEffect } from 'react'
import { theme } from 'SVTheme'
import { SafeAreaView, StatusBar } from 'react-native'
import { getDefaultTheme, setDefaultTheme } from '@keg-hub/re-theme'
import { ReThemeHeadProvider } from '@keg-hub/re-theme/head'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { Router } from 'SVComponents/router'
import { get } from '@keg-hub/jsutils'
import { ContainerRoutes } from 'SVNavigation/containerRoutes'
import { keg } from 'SVConfig'
import { getHistory } from 'SVNavigation'
import { isNative } from 'SVUtils/platform'

setDefaultTheme(theme)

const checkAppInit = setInit => {
  initAppAction?.()
  setInit(true)
}

/* This is only a temp solution for now. The page should already have this font */
const interFont = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;700&display=swap');`

/**
 * App for testing sessions app locally
 * @see `tap.json` routes object for which containers are bound to which url routes
 * @param {object} props 
 */
const MainApp = props => {
  const [activeTheme] = useState(getDefaultTheme())
  const [ init, setInit ] = useState(false)
  useEffect(() => void checkAppInit(setInit), [])

  return init ? (
    <>
      { (isNative() && (
        <SafeAreaView
          style={{
            backgroundColor: get(
              activeTheme,
              'colors.surface.primary.colors.dark'
            ),
          }}
        />
      )) || <style>{ interFont }</style> }
      <StatusBar barStyle={'default'} />
      <Router history={getHistory()}>
        <SafeAreaView>
          <Provider store={getStore()}>
            <ReThemeHeadProvider theme={activeTheme}>
              { /* setup routes from navigation config */ }
              <ContainerRoutes navigationConfigs={keg.routes} />
            </ReThemeHeadProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  ) : null
}

export default MainApp
