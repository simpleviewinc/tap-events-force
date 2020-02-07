import React from 'react'
import { HomeScreen } from 'SVScreens'
import { useTheme } from 're-theme'
import { Values } from 'SVConstants'
import { get }  from 'jsutils'
import { useCollection } from 'SVUtils/hooks'

const { events, sessions } = Values.categories

const AppContainer = props => {
  // Setup routing for screens here
  return <HomeScreen { ...props } />
}

export default AppContainer
