import '../src/theme/theme.config'
import React, { useState, useEffect } from 'react'
import { theme } from 'SVTheme'
import { SafeAreaView, StatusBar } from 'react-native'
import { getDefaultTheme, ReThemeProvider } from '@keg-hub/re-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { Router } from 'SVComponents/router'
import { Loading } from 'SVComponents'
import { get, checkCall } from '@keg-hub/jsutils'
import { ContainerRoutes } from 'SVNavigation/containerRoutes'
import { keg } from 'SVConfig'
import { getHistory } from 'SVNavigation'
import { useSelector } from 'react-redux'


const AppContent = props => {
  const isInit = useSelector(store => get(store.app, 'initialized', false))
  useEffect(() => void initAppAction(), [])

  return !isInit
    ? (<Loading />)
    : (
        <>
          <StatusBar barStyle={'default'} />
          <ReThemeProvider theme={props.theme}>
            <ContainerRoutes navigationConfigs={keg.routes} />
          </ReThemeProvider>
        </>
      )
}

/**
 * App for testing sessions app locally
 * @see `tap.json` routes object for which containers are bound to which url routes
 * @param {object} props 
 */
const MainApp = props => {
  const [activeTheme] = useState(getDefaultTheme())

  return (
    <SafeAreaView
      style={{
        backgroundColor: get(
          activeTheme,
          'colors.surface.primary.colors.dark'
        ),
      }}
    >
      <Router history={getHistory()}>
        <Provider store={getStore()}>
          <AppContent theme={activeTheme} />
        </Provider>
      </Router>
    </SafeAreaView>
  )
}

export default MainApp
