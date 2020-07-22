import React from 'react'
import { View, TouchableIcon, Text } from 'SVComponents'
import { useAgenda } from 'SVHooks'
import { incrementDay, decrementDay } from 'SVActions'
import { useTheme } from '@simpleviewinc/re-theme'

import moment from 'moment'

/**
 * Simple day toggling component
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props - session agenda props defined in evf interface
 */
export const DayToggle = props => {
  const { currentAgendaDay, currentDayNumber } = useAgenda()

  const theme = useTheme()

  return (
    <View style={theme.get('dayToggle.main')}>
      <TouchableIcon
        name={'chevron-left'}
        onPress={decrementDay}
      />
      <Text>
        Day { currentDayNumber } – { getDayString(currentAgendaDay) }
      </Text>
      <TouchableIcon
        name={'chevron-right'}
        onPress={incrementDay}
      />
    </View>
  )
}

/**
 * Formats the agenda day's date into a string of the form D MMMM YYYY
 * @param {*} agendaDay
 */
const getDayString = agendaDay =>
  agendaDay ? moment(agendaDay.date).format('D MMMM YYYY') : 'No Sessions'
