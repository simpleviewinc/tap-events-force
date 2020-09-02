import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@svkeg/keg-components'
import { useTheme, useStylesCallback } from '@keg-hub/re-theme'

/**
 * Builds the dynamic styles for LabelButton
 * @param {Object} theme - theme obj
 * @param {Object} extra - extra styles to add
 */
const buildStyles = (theme, extra) => {
  const labelStyle = theme.get(`eventsForce.${extra.className}`)

  return theme.join(
    theme.get('labelButton'),
    {
      default: { main: labelStyle },
      hover: { main: labelStyle },
      active: { main: { ...labelStyle, opacity: 0.4 } },
    },
    extra.style
  )
}

/**
 * Simple label component that can be clicked.
 * @param {Object} props
 * @param {Object} props.style - custom button styles that will override those defined in the theme file's main object. Object should define default, hover, and active themes for the different states of the button. @see `buildStyles`
 * @param {import('SVModels/label').Label} props.label - the label model instance
 * @param {Function} props.onPress - when clicked, calls onPress and passes the label object to it
 */
export const LabelButton = ({ style, label = {}, onPress }) => {
  const theme = useTheme()

  // merge with eventsForce color style and custom button style if exists
  const extraStyles = useMemo(
    () => ({
      style,
      className: label.className,
    }),
    [ style, label.className ]
  )

  // build the main style for the button, memoized
  const mainStyle = useStylesCallback(
    buildStyles,
    [
      label.className,
      theme.get('labelButton'),
      theme.get(`eventsForce.${label.className}`),
    ],
    extraStyles
  )

  const clickHandler = () => onPress && onPress(label)
  return (
    <Button
      styles={mainStyle}
      content={label.name}
      onClick={clickHandler}
    />
  )
}

LabelButton.propTypes = {
  style: PropTypes.object,
  label: PropTypes.object,
  onPress: PropTypes.func,
}
