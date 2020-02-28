
import React from 'react'
import { useTheme } from 're-theme'
import { TextBox } from 'keg-components'
import { View, Text } from 'SVComponents'
import PropTypes from 'prop-types'

/**
 * A Result Box for showing the scanned QR code
 * @param {string} text - text to show in box
 * @param {string} title - title above box
 * @param {object} style - style for wrapping view
 * @param {string} themePath - theme path for TextBox (@see keg-components)
 */
export const ResultBox = ({text='', title='', style, themePath}) => {
  const theme = useTheme()
  return (
    <View style={style}>
      <Text style={theme.get('resultBox.title')}>
        { title }
      </Text>
      <TextBox 
        themePath={themePath}
        text={text} 
        useClipboard
      />
    </View>
  )
}

ResultBox.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  themePath: PropTypes.string,
}