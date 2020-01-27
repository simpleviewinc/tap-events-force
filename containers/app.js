import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 're-theme'
import { get } from 'jsutils'

const AppContainer = props => {

  const theme = useTheme()

  return (
    <View
      style={ theme.join(
        get(theme, [ 'app', 'container' ]),
        get(props, [ 'styles', 'container' ]),
      )}
    >
      <Text>WOW</Text>
    </View>
  )
}

export default AppContainer
