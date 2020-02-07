import React from 'react'
import { View, H4 } from 'SVComponents'
import { useTheme } from 're-theme'
import { Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

const switchScreen = event => {
  console.log(`---------- switchScreen ----------`)
  console.log(event)
}

export const Continue = props => {

  const theme = useTheme()
  
  return (
    <View
      style={ theme.get(
        'continue.container',
        'display.content.center'
      )}
    >
      <Touchable
        onPress={ switchScreen }
        style={ theme.get('continue.button') }
      >
        <H4 style={ theme.get('continue.text') }>
          Continue
        </H4>
      </Touchable>
    </View>
  )
}
