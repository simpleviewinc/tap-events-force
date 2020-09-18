import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@keg-hub/keg-components'
import { useTheme, useStylesCallback } from '@keg-hub/re-theme'
import { checkCall } from '@keg-hub/jsutils'

/**
 * Builds the dynamic styles for LabelButton
 * @param {Object} theme - theme obj
 * @param {Object} extra - extra styles to add
 */
const buildStyles = (theme, extra) => {
  const labelStyle = theme.get(`eventsForce.labels.${extra.className}`)

  // updated button styles with the eventsForce styles
  const buttonStyles = {
    default: { main: labelStyle },
    hover: { main: labelStyle },
    active: { main: labelStyle },
  }
  return theme.join(
    theme.get('labelButton'),
    {
      selected: {
        ...buttonStyles,
        active: { main: { ...labelStyle, opacity: 0.4 } },
      },
      unselected: {
        ...buttonStyles,
      },
    },
    extra.styles
  )
}

/**
 * Simple label component that can be clicked.
 * @param {Object} props
 * @param {Object} props.styles - custom button styles that will override those defined in the theme file's main object. Object should define default, hover, and active themes for the different states of the button. @see `buildStyles`
 * @param {import('SVModels/label').Label} props.label - the label model instance
 * @param {Function} props.onPress - when clicked, calls onPress and passes the label object to it
 */
export const LabelButton = ({
  styles,
  label = {},
  onPress,
  toggledOn = true,
}) => {
  const theme = useTheme()

  // merge with eventsForce color style and custom button style if exists
  const extraStyles = useMemo(
    () => ({
      styles,
      className: label.className,
    }),
    [ styles, label.className ]
  )

  // build the main style for the button, memoized
  const mainStyle = useStylesCallback(
    buildStyles,
    [
      label.className,
      theme.get('labelButton'),
      theme.get(`eventsForce.labels.${label.className}`),
    ],
    extraStyles
  )
  const clickHandler = () => checkCall(onPress, label)
  return (
    <Button
      className={label.className}
      styles={toggledOn ? mainStyle.selected : mainStyle.unselected}
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
