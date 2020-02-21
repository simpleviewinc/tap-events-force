import React from 'react'
import { View, Text } from 'SVComponents'
import { useTheme } from 're-theme'
import { TextBox } from './textBox'

/**
 * A Result Box for showing readonly text with a title
 * @param {Object} props
 * @param {String} text - string text to display
 */
export const ResultBox = ({text='', title=''}) => {
  const theme = useTheme()
  return (
    <View>
      <Text style={theme.get('resultBox.title')}>{title}</Text>
      <TextBox text={text} />
    </View>
  )
}