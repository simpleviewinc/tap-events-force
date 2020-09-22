import React, { useMemo } from 'react'
import { View, Button } from '@keg-hub/keg-components'
import { useStylesCallback } from '@keg-hub/re-theme'
import { useParsedStyle } from 'SVHooks/useParsedStyle'
import { set, get } from '@keg-hub/jsutils'

/**
 * Builds the styles for the Evf button merging the default styles with the parsed styles
 * @param {Object} theme - Global Theme object
 * @param {Object} custom - contains {type, styles, parsed}
 * 
 * @returns {Object} - Merged Evf button styles
 */
const buildStyles = (theme, custom) => {
  const btnStyles = theme.get(`button.evfButton.${custom.type}`)
  // Get the keys of the content.button, to get a list of all button states
  // This allows dynamically matching the Theme states even if they are changed
  const stateKeys = Object.keys(get(btnStyles, 'content.button', {}))

  return theme.get(
    btnStyles,
    custom.styles,
    custom.parsed && 
      // Loop over the state keys, and set the parsed styles for each
      stateKeys.reduce((parsed, state) => {
        set(parsed, `content.button.${state}.main`, custom.parsed)
        return parsed
      }, {})
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
export const EvfButton = ({
  styles,
  onClick,
  type = 'default',
  text,
  loading,
}) => {
  // build the main style for the button, memoized
  const buttonCls = `ef-button-${type}`
  const parsedStyles = useParsedStyle(buttonCls)
  const customStyles = useMemo(() => ({ type, styles, parsed: parsedStyles }), [
    type,
    styles,
    parsedStyles,
  ])
  const mainStyle = useStylesCallback(buildStyles, [ type, styles ], customStyles)

  return (
    <View style={mainStyle?.main}>
      <View style={mainStyle?.content?.topLeftCorner?.main} />
      { /* <Loading /> */ }
      <Button
        className={[ buttonCls, `ef-session-button-${type}` ]}
        onClick={onClick}
        styles={mainStyle?.content?.button}
        content={text}
      />
    </View>
  )
}
