import React, { useMemo } from 'react'
import { View, Button, Text } from '@keg-hub/keg-components'
import { useStylesCallback } from '@keg-hub/re-theme'
import { EvfLoading } from 'SVComponents/loading/evfLoading'

/**
 * Builds the styles for the Evf button merging the default styles with the parsed styles
 * @param {Object} theme - Global Theme object
 * @param {Object} custom - contains {type, styles}
 *
 * @returns {Object} - Merged Evf button styles
 */
const buildStyles = (theme, custom) =>
  theme.get(`button.evfButton.${custom.type}`, custom.styles)

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
  const buttonCls = `ef-action-button-${type}`

  const customStyles = useMemo(() => ({ type, styles }), [ type, styles ])

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
