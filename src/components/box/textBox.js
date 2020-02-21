import React from 'react'
import { View, Text } from 'SVComponents'
import { useTheme } from 're-theme'
import { Clipboard } from 'react-native'
import { TouchableIcon } from 'keg-components'

/**
 * A Text Box for showing readonly text. Includes a copy to clipboard button.
 * @param {Object} props
 * @param {String} text - string text to display
 */
export const TextBox = ({text=null}) => {
  const theme = useTheme()
  return (
    <View style={theme.get('textBox.container')}>
      <View style={theme.get('textBox.textContainer')}>
        <Text 
          numberOfLines={100}
          style={theme.get('textBox.text')}>
          { text || '' }
        </Text>
      </View>
      { text &&
          <TouchableIcon 
            name={'copy'} 
            size={15}
            wrapStyle={theme.get('textBox.clipboard')}
            onPress={_ => text && Clipboard.setString(text)}
          />
      }
    </View>
  )
}
