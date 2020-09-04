import * as React from 'react'
import { View, Button } from 'SVComponents'
import { useTheme, useStylesCallback } from '@keg-hub/re-theme'

/**
 * Builds the dynamic styles
 * @param {Object} theme - theme obj
 * @param {Object} customStyles - default style combined with userStyles
 */
const buildStyles = (theme, customStyles) => {
  const defaultButtonStyles = customStyles?.content?.button
  return theme.join(
    {
      content: {
        button: {
          default: defaultButtonStyles,
          hover: defaultButtonStyles,
          active: {
            main: { ...defaultButtonStyles.main, opacity: 0.4 },
            content: defaultButtonStyles.content,
          },
        },
      },
    },
    customStyles
  )
}

/**
 * EvfButton
 * @param {object} props
 * @param {object} props.styles
 * @param {object} props.onClick
 * @param {('default'|'primary')} props.type - button type. defaults to 'default'
 * @param {string} props.text - text to display on button
 */
export const EvfButton = ({ styles, onClick, type = 'default', text }) => {
  const theme = useTheme()
  const buttonStyles = theme.join(theme.get(`button.evfButton.${type}`), styles)

  // build the main style for the button, memoized
  const mainStyle = useStylesCallback(buildStyles, [], buttonStyles)
  return (
    <View style={mainStyle?.main}>
      { /* to clip the top right of the component */ }
      <View style={mainStyle?.content?.box?.main}></View>
      <Button
        onClick={onClick}
        styles={mainStyle?.content?.button}
        content={text}
      />
    </View>
  )
}

EvfButton.dataSet = {
  main: { class: 'evf-button-main' },
  content: {
    textView: {
      main: { class: 'evf-button-content-textView-main' },
      content: { class: 'evf-button-content-textView-content' },
    },
  },
}
