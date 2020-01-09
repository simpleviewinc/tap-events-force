import React, { useEffect, useState } from 'react'
import { View, Text, Platform } from 'react-native'
import { withTheme, ReThemeProvider } from 're-theme'
import { theme as tapTheme } from '../theme/tapTheme'
import { Button } from 'SVComponents'


const App = props => {

  return (
    <ReThemeProvider theme={tapTheme} merge={true}>
      <View style={{ textAlign: 'center' }} >
        <Button style={{ width: 200 }} >
          <Text style={{ color: "#ffffff" }} >
            Events Force
          </Text>
        </Button>
      </View>
    </ReThemeProvider>
  )
}

export default withTheme(App)
