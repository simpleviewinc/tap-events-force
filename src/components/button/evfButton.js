import React, { useMemo } from 'react'
import { View, Button } from '@keg-hub/keg-components'
import { useStylesCallback } from '@keg-hub/re-theme'

/**
 * @param {object} theme
 * @param {object} custom - contains {type, styles}
 */
const buildStyles = (theme, custom) => {
  return theme.join(theme.get(`button.evfButton.${custom.type}`), custom.styles)
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
  const mainStyle = useStylesCallback(buildStyles, [ type, styles ], customStyles)

  return (
    <View style={mainStyle?.main}>
      <View style={mainStyle?.content?.topLeftCorner?.main}></View>
      <Button
        onClick={onClick}
        styles={mainStyle?.content?.button}
        content={text}
      />
    </View>
  )
}
