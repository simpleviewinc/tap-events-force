import React from 'react'
import { UpdateDayButton } from './updateDayButton'
import { View, Text } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'
import { noOp } from 'SVUtils'

import moment from 'moment'

/**
 * Formats the agenda day's date into a string of the form D MMMM YYYY
 * @param {*} agendaDay
 */
const getDayString = currentDate =>
  currentDate ? moment(currentDate).format('D MMMM YYYY') : 'N/A'

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

  return (
    <View style={theme.get('dayToggle.main')}>
      <UpdateDayButton
        type={'decrement'}
        disabled={disableDecrement}
        onDayChange={onDecrement}
      />

      <Text>
        Day { dayNumber } – { getDayString(date) }
      </Text>

      <UpdateDayButton
        type={'increment'}
        disabled={disableIncrement}
        onDayChange={onIncrement}
      />
    </View>
  )
}
DayToggle.propTypes = {}
