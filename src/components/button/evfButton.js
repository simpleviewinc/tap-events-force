import React, { useMemo } from 'react'
import { View, Button, Text } from '@keg-hub/keg-components'
import { useStylesCallback, useTheme } from '@keg-hub/re-theme'
import { useParsedStyle } from 'SVHooks/useParsedStyle'
import { EvfLoading } from 'SVComponents/loading'
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
 * @param {boolean} props.isProcessing - to display processing content
 */
export const EvfButton = props => {
  const {
    children,
    className,
    disabled,
    styles,
    onClick,
    type = 'default',
    text,
    isProcessing = false,
    pendingStyles,
  } = props

  // build the main style for the button, memoized
  const theme = useTheme()
  const buttonCls = `ef-action-button-${type}`

  const parsedActionStyles = useParsedStyle(buttonCls)
  const customParsedStyles = useParsedStyle(className)

  const customStyles = useMemo(
    () => ({
      type,
      styles,
      parsed: theme.get(parsedActionStyles, customParsedStyles),
    }),
    [ type, styles, parsedActionStyles, customParsedStyles ]
  )

  const mainStyle = useStylesCallback(
    buildStyles,
    [ type, styles, isProcessing ],
    customStyles
  )

  return (
    <View style={mainStyle?.main}>
      <View style={mainStyle?.content?.topLeftCorner?.main} />
      <Button
        disabled={disabled || isProcessing}
        className={[ buttonCls, className ]}
        onClick={onClick}
        styles={mainStyle?.content?.button}
      >
        { isProcessing
          ? buttonProps => (
              <Processing
                {...buttonProps}
                styles={mainStyle?.content?.processing}
                textStyles={pendingStyles?.text}
                iconStyles={pendingStyles?.icon}
                size={mainStyle?.content?.processing?.icon?.size || 20}
              />
            )
          : children || text }
      </Button>
    </View>
  )
}

/**
 * Processing
 * @param {object} props
 * @param {object} props.styles
 * @param {string=} props.text
 */
const Processing = ({
  textStyles,
  iconStyles,
  styles,
  size,
  text = 'Processing',
}) => {
  return (
    <View style={styles.main}>
      <EvfLoading
        color={iconStyles?.color}
        size={size}
      />
      <Text style={[ styles.text, textStyles ]}>{ text }</Text>
    </View>
  )
}
