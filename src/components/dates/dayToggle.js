import React from 'react'
import { UpdateDayButton } from './updateDayButton'
import { useTheme, useDimensions } from '@keg-hub/re-theme'
import { noOp } from 'SVUtils/helpers/method/noop'
import { View, Text } from '@keg-hub/keg-components'
import { isMobileSize } from 'SVUtils/theme'
import { useDateString } from 'SVHooks/dates/useDateString'

/**
 * Simple day toggling component
 * @param {Object} props
 * @param {string} props.date - date shown inside of component
 * @param {number} props.dayNumber - day number shown inside of component
 * @param {boolean} props.disableDecrement - if true, greys out the decrement button
 * @param {boolean} props.disableIncrement - if true, greys out the increment button
 * @param {Function} props.onIncrement -- cb that runs when the increment-day button is pressed
 * @param {Function} props.onDecrement -- cb that runs when the decrement-day button is pressed
 */
export const DayToggle = props => {
  const {
    date = null,
    dayNumber = 0,
    disableDecrement = false,
    disableIncrement = false,
    onIncrement = noOp,
    onDecrement = noOp,
  } = props

  const theme = useTheme()
  const dayToggleStyles = theme.get('dayToggle')

  const dims = useDimensions()
  const dateStr = useDateString(date, isMobileSize(theme), dims.width < 750)
  const dayText = `Day ${dayNumber} - ${dateStr}`

  return (
    <View
      className={'ef-sessions-date-selector'}
      style={dayToggleStyles?.main}
    >
      <UpdateDayButton
        styles={dayToggleStyles?.content?.decrement}
        type={'decrement'}
        disabled={disableDecrement}
        onDayChange={onDecrement}
      />

      <Text
        className={'ef-sessions-date-text'}
        style={dayToggleStyles?.content?.text}
        numberOfLines={1}
      >
        { dayText }
      </Text>

      <UpdateDayButton
        type={'increment'}
        styles={dayToggleStyles?.content?.increment}
        disabled={disableIncrement}
        onDayChange={onIncrement}
      />
    </View>
  )
}
DayToggle.propTypes = {}
