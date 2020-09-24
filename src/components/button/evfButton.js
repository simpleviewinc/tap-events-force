import React, { useMemo } from 'react'
import { View, Button } from '@keg-hub/keg-components'
import { useStylesCallback } from '@keg-hub/re-theme'
import { useParsedStyle } from 'SVHooks/useParsedStyle'

/**
 * @param {object} theme
 * @param {object} custom - contains {type, styles}
 */
const buildStyles = (theme, custom) => {
  const btnStyles = theme.get(`button.evfButton.${custom.type}`)
  const parsedState = { main: custom.parsed }

  return theme.get(btnStyles, custom.styles, {
    content: {
      button: {
        active: parsedState,
        default: parsedState,
        hover: parsedState,
      },
    },
  })
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
      <View style={mainStyle?.content?.topLeftCorner?.main}></View>
      <Button
        className={[ buttonCls, `ef-session-button-${type}` ]}
        onClick={onClick}
        styles={mainStyle?.content?.button}
        content={text}
      />
    </View>
  )
}
