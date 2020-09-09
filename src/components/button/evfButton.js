import React, { useMemo } from 'react'
import { View, Button } from '@keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'

/**
 * EvfButton
 * @param {object} props
 * @param {object} props.styles
 * @param {object} props.onClick
 * @param {('default'|'primary')} props.type - button type. defaults to 'default'
 * @param {string} props.text - text to display on button
 */
export const EvfButton = ({ styles, onClick, type = 'default', text }) => {
  // build the main style for the button, memoized
  const theme = useTheme()
  const mainStyle = useMemo(() => {
    return theme.join(theme.get(`button.evfButton.${type}`), styles)
  }, [ type, styles ])

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
