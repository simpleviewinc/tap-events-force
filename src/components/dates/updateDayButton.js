import React from 'react'
import { TouchableIcon } from 'SVComponents'
import { useThemeMemo } from 'SVHooks'
import { useTheme } from '@simpleviewinc/re-theme'
import { EVFIcons } from 'SVFonts'
import PropTypes from 'prop-types'

/**
 * A touchable chevron icon that changes direction based on type
 * @param {Object} params
 * @param {string} params.type - one of ['decrement', 'increment'] - shows a left icon with 'decrement', and a 'right' icon with 'increment'
 * @param {Object} params.style - optional styles to override defaults { main: {}, content: {} }
 * @param {boolean} params.disabled - true if the button should be disabled
 * @param {Function} params.onDayChange - callback executed when the day changes
 */
export const UpdateDayButton = ({
  type = 'increment',
  style = {},
  disabled = false,
  onDayChange,
}) => {
  const theme = useTheme()

  const dynamicStyles = {
    opacity: disabled ? 0.75 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style.main,
  }

  const iconStyles = useThemeMemo(theme, `dayToggle.icon`, dynamicStyles, [
    disabled,
  ])

  const iconName = `chevron${type === 'decrement' ? 'Left' : 'Right'}`

  return (
    <TouchableIcon
      dataSet={UpdateDayButton.dataSet.main}
      Element={EVFIcons}
      styles={iconStyles}
      name={iconName}
      onPress={onDayChange}
      size={16}
    />
  )
}

UpdateDayButton.propTypes = {
  type: PropTypes.oneOf([ 'increment', 'decrement' ]),
  disabled: PropTypes.bool,
}

UpdateDayButton.dataSet = {
  main: { class: 'update-day-button-main' },
}
