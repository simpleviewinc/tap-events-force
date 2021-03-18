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
    disabled,
    styles,
    onClick,
    type = 'default',
    text,
    isProcessing = false,
    pendingStyles,
    buttonType,
  } = props

  const customStyles = useMemo(() => ({ type, styles }), [ type, styles ])

  const mainStyle = useStylesCallback(
    buildStyles,
    [ type, styles, isProcessing ],
    customStyles
  )

  const content = isProcessing
    ? buttonProps => (
        <Processing
          {...buttonProps}
          styles={mainStyle?.content?.processing}
          textStyles={pendingStyles?.text}
          iconStyles={pendingStyles?.icon}
          size={mainStyle?.content?.processing?.icon?.size || 20}
        />
      )
    : children || text

  // EVF will only accept these props for their button componen
  // The buttonType should be one of “selectSession” | "modalPrimary" | "modalSecondary"
  return (
    <Button
      disabled={disabled || isProcessing}
      buttonType={buttonType}
      onClick={onClick}
      children={content}
    />
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
