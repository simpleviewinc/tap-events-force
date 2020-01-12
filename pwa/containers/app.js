import React, { useEffect, useState } from 'react'
import { View, Text, Platform } from 'react-native'
import { withTheme, ReThemeProvider } from 're-theme'
import { theme as tapTheme } from '../theme/tapTheme'
import { Button } from 'SVComponents'
import { ChatContainer } from './chat'

const App = props => {
  return (
    <ReThemeProvider theme={tapTheme} merge={true}>
      <View style={{ textAlign: 'center' }} >
        <ChatContainer />
      </View>
    </ReThemeProvider>
  )
}

export default withTheme(App)
