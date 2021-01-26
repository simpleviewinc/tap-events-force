import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@keg-hub/keg-components'
import { useTheme, useStylesCallback } from '@keg-hub/re-theme'
import { checkCall } from '@keg-hub/jsutils'
import { Values } from 'SVConstants/values'

const { SESSION_BOOKING_LABEL_MAP } = Values

/**
 * Builds the dynamic styles for LabelButton
 * @param {Object} theme - theme obj
 * @param {Object} extra - extra styles to add
 */
const buildStyles = (theme, extra) => {
  return theme.get(
    theme.get('labelButton'),
    {
      selected: {
        active: { main: { opacity: 0.4 } },
      },
      unselected: {},
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
    [ label.className, theme.get('labelButton') ],
    extraStyles
  )

  const clickHandler = () => checkCall(onPress, label)

  return (
    <Button
      className={label.className}
      styles={toggledOn ? mainStyle.selected : mainStyle.unselected}
      content={SESSION_BOOKING_LABEL_MAP[label.identifier] || label.name}
      onClick={clickHandler}
    />
  )
}

LabelButton.propTypes = {
  style: PropTypes.object,
  label: PropTypes.object,
  onPress: PropTypes.func,
}
