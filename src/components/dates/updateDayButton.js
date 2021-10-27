import React from 'react'
import { useStylesCallback } from '@keg-hub/re-theme'
import { EVFIcons } from 'SVIcons'
import { View } from '@keg-hub/keg-components'
import PropTypes from 'prop-types'

/**
 * Builds dynamic styles for  `UpdateDayButton`
 * @param {object} theme - retheme object
 * @param {object} extra - extra styles and props
 */
const buildStyles = (theme, extra) => {
  return {
    ...extra?.style?.icon,
    opacity: extra.disabled ? 0.4 : 1,
    cursor: extra.disabled ? 'not-allowed' : 'pointer',
  }
}

/**
 * A touchable chevron icon that changes direction based on type
 * @param {Object} props
 * @param {string?} [props.type='increment'] - one of ['decrement', 'increment'] - shows a left icon with 'decrement', and a 'right' icon with 'increment'
 * @param {Object?} [props.styles={}] - optional styles to override defaults { main: {}, content: {} }
 * @param {boolean?} [props.disabled=false] - true if the button should be disabled
 * @param {Function?} props.onDayChange - callback executed when the day changes
 */
export const UpdateDayButton = props => {
  const {
    type = 'increment',
    styles = {},
    disabled = false,
    onDayChange,
  } = props

  const iconStyles = useStylesCallback(buildStyles, [ disabled, styles ], {
    disabled,
    style: styles,
  })

  const ChevronIcon =
    type === 'increment' ? EVFIcons.DayToggleRight : EVFIcons.DayToggleLeft

  return (
    <View 
      className={`ef-sessions-date-button-${type}`}
    >
      <ChevronIcon
        onPress={!disabled && onDayChange}
        accessibilityRole='button'
        accessibilityLabel={`${type} day`}
        style={iconStyles}
        type={type}
      />
    </View>
  )
}
UpdateDayButton.propTypes = {
  type: PropTypes.oneOf([ 'increment', 'decrement' ]),
  disabled: PropTypes.bool,
}
