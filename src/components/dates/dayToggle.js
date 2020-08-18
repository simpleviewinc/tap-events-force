import React from 'react'
import { UpdateDayButton } from './updateDayButton'
import { View, Text } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'
import { noOp } from 'SVUtils'
import moment from 'moment'
import { isMobileSize } from 'SVUtils/theme'

/**
 * Formats the date into a string of the form D MMMM YYYY
 * @param {string} currentDate - current date string
 * @param {boolean} isMobileSize
 */
const getDayString = (currentDate, isMobileSize) => {
  const format = isMobileSize ? 'ddd' : 'D MMMM YYYY'
  return currentDate ? moment(currentDate).format(format) : 'N/A'
}

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
  const dayText = `Day ${dayNumber} 
    - ${getDayString(date, isMobileSize(theme))}`
  return (
    <View
      dataSet={DayToggle.dataSet.main}
      style={dayToggleStyles?.main}
    >
      <UpdateDayButton
        dataSet={DayToggle.dataSet.content.decrement}
        style={dayToggleStyles?.content?.decrementIcon}
        type={'decrement'}
        disabled={disableDecrement}
        onDayChange={onDecrement}
      />

      <Text
        style={dayToggleStyles?.content?.text}
        numberOfLines={1}
      >
        { dayText }
      </Text>

      <UpdateDayButton
        dataSet={DayToggle.dataSet.content.increment}
        type={'increment'}
        style={dayToggleStyles?.content?.incrementIcon}
        disabled={disableIncrement}
        onDayChange={onIncrement}
      />
    </View>
  )
}
DayToggle.propTypes = {}
DayToggle.dataSet = {
  main: { class: 'day-toggle-main' },
  content: {
    decrement: { class: 'day-toggle-decrement' },
    text: { class: 'day-toggle-text' },
    increment: { class: 'day-toggle-increment' },
  },
}
