import React, { useEffect, useState } from 'react'
import { View, Text, Platform } from 'react-native'
import { ReThemeProvider } from 're-theme'
import { theme as tapTheme } from 'SVTheme'
import { Button } from 'SVComponents'
import { ChatContainer } from './chat'

const AppContainer = props => {
  return (
    <ReThemeProvider theme={tapTheme} merge={true}>
      <View style={{ textAlign: 'center' }} >
        <ChatContainer />
      </View>
    </ReThemeProvider>
  )
}

export default AppContainer