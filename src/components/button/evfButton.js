import React, {useMemo} from 'react'
import { View, Button } from '@keg-hub/keg-components'
import { useStylesCallback } from '@keg-hub/re-theme'

/**
 * Builds the dynamic styles
 * @param {Object} theme - theme obj
 * @param {Object} custom - contains { type, styles }
 * @param {string} custom.type - button type defined in the evfButton theme
 * @param {Object} custom.styles - custom styles passed in by the consumer
 */
const buildStyles = (theme, custom) => {
  // const defaultButtonStyles = customStyles?.content?.button
  return theme.join(
    theme.get(`button.evfButton.${custom.type}`), 
    custom.styles
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
  
  // build the main style for the button, memoized
  const customStyles = useMemo(() => ({ type, styles }), [ type, styles ])
  const mainStyle = useStylesCallback(buildStyles, [type, styles], customStyles)

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
