import React from 'react'
import { useStylesCallback } from '@keg-hub/re-theme'
import { EVFIcons } from 'SVIcons'
import PropTypes from 'prop-types'

/**
 * Builds dynamic styles for  `UpdateDayButton`
 * @param {object} theme - retheme object
 * @param {object} extra - extra styles and props
 */
const buildStyles = (theme, extra) => ({
  opacity: extra.disabled ? 0.4 : 1,
  cursor: extra.disabled ? 'not-allowed' : 'pointer',
  ...extra.style,
})

/**
 * A touchable chevron icon that changes direction based on type
 * @param {Object} props
 * @param {string?} [props.type='increment'] - one of ['decrement', 'increment'] - shows a left icon with 'decrement', and a 'right' icon with 'increment'
 * @param {Object?} [props.styles={}] - optional styles to override defaults { main: {}, content: {} }
 * @param {boolean?} [props.disabled=false] - true if the button should be disabled
 * @param {Function?} props.onDayChange - callback executed when the day changes
 * @param {object?} props.dataSet - dataSet object that can contain a class key for identification in tests
 */
export const UpdateDayButton = props => {
  const {
    type = 'increment',
    styles = {},
    disabled = false,
    onDayChange,
    dataSet = UpdateDayButton.dataSet.main,
  } = props

  const iconStyles = useStylesCallback(buildStyles, [ disabled, styles.main ], {
    disabled,
    style: styles.main,
  })

  const ChevronIcon =
    type === 'increment' ? EVFIcons.DayToggleRight : EVFIcons.DayToggleLeft

  return (
    <ChevronIcon
      dataSet={dataSet}
      onPress={onDayChange}
      style={iconStyles}
      type={type}
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
