import React from 'react'
import { View } from 'react-native'
import { useTheme } from 're-theme'
import { get }  from 'jsutils'
import { QRContainer } from './qrContainer'

export const AppContainer = props => {
  const theme = useTheme()

  return (
    <View
      style={ theme.join(
        get(theme, [ 'app', 'container' ]),
        get(props, [ 'styles', 'container' ]),
      )}
    >
      <QRContainer />
    </View>
  )
}
