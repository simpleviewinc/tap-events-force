import React, { useMemo } from 'react'
import { View, Button, Text } from '@keg-hub/keg-components'
import { useStylesCallback } from '@keg-hub/re-theme'
import { useParsedStyle } from 'SVHooks/useParsedStyle'
import { EvfLoading } from 'SVComponents/loading'
import { set, get } from '@keg-hub/jsutils'

/**
 * Builds the styles for the Evf button merging the default styles with the parsed styles
 * @param {Object} theme - Global Theme object
 * @param {Object} custom - contains {type, styles, parsed, isProcessing}
 * 
 * @returns {Object} - Merged Evf button styles
 */
const buildStyles = (theme, custom) => {
  const btnStyles = theme.get(`button.evfButton.${custom.type}`)
  // Get the keys of the content.button, to get a list of all button states
  // This allows dynamically matching the Theme states even if they are changed
  const stateKeys = Object.keys(get(btnStyles, 'content.button', {}))

  // overwrite the min width when trying to display 'processing' content
  // for cases where the default content is smaller  than the processing content
  const fitWidth = custom.isProcessing && {
    minWidth: 'fit-content',
  }

  return theme.get(btnStyles, custom.styles, {
    main: {
      ...fitWidth,
    },
    content: {
      button: {
        active: parsedState,
        default: parsedState,
        hover: parsedState,
      },
    },
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
export const EvfButton = ({
  styles,
  onClick,
  type = 'default',
  text,
  isProcessing = false,
}) => {
  // build the main style for the button, memoized
  const buttonCls = `ef-button-${type}`
  const parsedStyles = useParsedStyle(buttonCls)
  const customStyles = useMemo(
    () => ({ type, styles, parsed: parsedStyles, isProcessing }),
    [ type, styles, parsedStyles, isProcessing ]
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
        disabled={isProcessing}
        className={[ buttonCls, `ef-session-button-${type}` ]}
        onClick={onClick}
        styles={mainStyle?.content?.button}
      >
        { isProcessing ? (
          <Processing
            styles={mainStyle?.content?.processing}
            size={mainStyle?.content?.processing?.icon?.size || 20}
          />
        ) : (
          text
        ) }
      </Button>
    </View>
  )
}

/**
 * Processing
 * @param {object} props
 * @param {object} props.styles
 */
const Processing = ({ styles, size }) => {
  return (
    <View style={styles.main}>
      <EvfLoading size={size} />
      <Text style={styles.text}>Processing</Text>
    </View>
  )
}
