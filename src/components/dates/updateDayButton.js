import React from 'react'
import { TouchableIcon } from 'SVComponents'
import { useThemeMemo } from 'SVHooks'
import { useTheme } from '@simpleviewinc/re-theme'
import PropTypes from 'prop-types'

/**
 * A touchable chevron icon that changes direction based on type
 * @param {Object} params
 * @param {string} type - one of ['decrement', 'increment'] - shows a left icon with 'decrement', and a 'right' icon with 'increment'
 * @param {boolean} disabled - true if the button should be disabled
 * @param {Function} onDayChange - callback executed when the day changes
 */
export const UpdateDayButton = ({
  type = 'increment',
  disabled = false,
  onDayChange,
}) => {
  const theme = useTheme()

  const dynamicStyles = {
    opacity: disabled ? 0.75 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  }

  const iconStyles = useThemeMemo(theme, `dayToggle.icon`, dynamicStyles, [
    disabled,
  ])

  const iconName = `chevron-${type === 'decrement' ? 'left' : 'right'}`

  return (
    <TouchableIcon
      styles={iconStyles}
      name={iconName}
      onPress={onDayChange}
    />
  )
}

UpdateDayButton.propTypes = {
  type: PropTypes.oneOf([ 'increment', 'decrement' ]),
  disabled: PropTypes.bool,
}
