import React, { useCallback } from 'react'
import { incrementDay, decrementDay } from 'SVActions/session/dates'
import { DayToggle } from 'SVComponents/dates/dayToggle'
import { get } from '@keg-hub/jsutils'
import { useAgenda } from 'SVHooks/models/useAgenda'
import { ItemHeader } from '@keg-hub/keg-components'
import { useTheme } from '@keg-hub/re-theme'

/**
 * Component that will hold the day toggle and filter button
 * @param {object} props
 * @param {object} props.styles - styles obj
 * @param {Array<import('SVModels/label').Label>} props.labels - session labels
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 */
export const SessionsHeader = ({ dayNum, onDayChange, labels }) => {
  const {
    agendaLength,
    currentAgendaDay = {},
    currentDayNumber,
    isLatestDay,
    isFirstDay,
  } = useAgenda()

  const theme = useTheme()
  const styles = theme.get('sessions')

  const increment = useCallback(() => incrementDay(onDayChange), [onDayChange])
  const decrement = useCallback(() => decrementDay(onDayChange), [onDayChange])
  const headerStyles = styles.content?.header

  return (
    <ItemHeader
      styles={headerStyles}
      CenterComponent={
        <DayToggle
          dayNumber={dayNum}
          disableDecrement={isFirstDay}
          disableIncrement={isLatestDay || !agendaLength}
          onDecrement={decrement}
          onIncrement={increment}
        />
      }
    />
  )
}
