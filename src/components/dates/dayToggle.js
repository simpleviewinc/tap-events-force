import React from 'react'
import { UpdateDayButton } from './updateDayButton'
import { View, Text } from 'SVComponents'
import { useAgenda } from 'SVHooks'
import { useTheme } from '@simpleviewinc/re-theme'

import moment from 'moment'

/**
 * Formats the agenda day's date into a string of the form D MMMM YYYY
 * @param {*} agendaDay
 */
const getDayString = agendaDay =>
  agendaDay ? moment(agendaDay.date).format('D MMMM YYYY') : 'No Sessions'

/**
 * Simple day toggling component
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props - session agenda props defined in evf interface
 */
export const DayToggle = ({ onDayChange }) => {
  const {
    currentAgendaDay,
    currentDayNumber,
    isLatestDay,
    isFirstDay,
  } = useAgenda()

  const theme = useTheme()

  return (
    <View style={theme.get('dayToggle.main')}>
      <UpdateDayButton
        type={'decrement'}
        disabled={isFirstDay}
        onDayChange={onDayChange}
      />

      <Text>
        Day { currentDayNumber } – { getDayString(currentAgendaDay) }
      </Text>

      <UpdateDayButton
        type={'increment'}
        disabled={isLatestDay}
        onDayChange={onDayChange}
      />
    </View>
  )
}
DayToggle.propTypes = {}
