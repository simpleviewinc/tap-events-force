import React, { useEffect, useCallback } from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { useAgenda } from 'SVHooks'
import { View } from 'SVComponents'
import { DayToggle } from 'SVComponents/dates/dayToggle'
import { mapSessionInterface, incrementDay, decrementDay } from 'SVActions'
import { noOp } from 'SVUtils'
import { RenderModals } from 'SVComponents/modal'
import { GridContainer } from 'SVContainers/gridContainer'
import { pickKeys, mapObj, get } from 'jsutils'
import { useSelector, shallowEqual } from 'react-redux'

/**
 * SessionComponent
 * @param {Object} props
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props.sessionData - session agenda props defined in evf interface
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 */
export const Sessions = props => {
  const { onDayChange = noOp, sessionData } = props

  useEffect(() => void mapSessionInterface(sessionData), [])

  const theme = useTheme()

  const { labels, agendaSessions, modals } = useSelector(
    ({ items }) => pickKeys(items, [ 'labels', 'agendaSessions', 'modals' ]),
    shallowEqual
  )

  const {
    currentAgendaDay = {},
    currentDayNumber,
    isLatestDay,
    isFirstDay,
  } = useAgenda()

  const increment = useCallback(() => incrementDay(onDayChange), [onDayChange])
  const decrement = useCallback(() => decrementDay(onDayChange), [onDayChange])

  return (
    <View
      dataSet={Sessions.dataSet.main}
      style={theme.get('sessions.main')}
    >
      <DayToggle
        style={theme.get('sessions.dayToggle')}
        date={get(currentAgendaDay, 'date')}
        dayNumber={currentDayNumber}
        disableDecrement={isFirstDay}
        disableIncrement={isLatestDay}
        onDecrement={decrement}
        onIncrement={increment}
      />

      {
        // creates a gridContainer separated by hour blocks
        mapObj(agendaSessions[currentDayNumber || 2], (key, sessions) => {
          return (
            <GridContainer
              key={key}
              sessions={sessions}
              labels={labels}
              timeBlock={key}
            />
          )
        })
      }
      { modals.length > 0 && RenderModals(modals) }
    </View>
  )
}

Sessions.dataSet = {
  main: { class: 'sessions-main' },
}
