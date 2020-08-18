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
 * Component that will hold the day toggle and filter button
 * @param {object} props.styles - styles obj
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 */
const SessionsHeader = ({ styles, onDayChange }) => {
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
      style={styles.content?.header?.main}
      dataSet={Sessions.dataSet.content.header}
    >
      <DayToggle
        date={get(currentAgendaDay, 'date')}
        dayNumber={currentDayNumber}
        disableDecrement={isFirstDay}
        disableIncrement={isLatestDay}
        onDecrement={decrement}
        onIncrement={increment}
      />
    </View>
  )
}

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
  const sessionsStyles = theme.get('sessions')

  const { labels, agendaSessions, modals, settings } = useSelector(
    ({ items }) =>
      pickKeys(items, [ 'labels', 'agendaSessions', 'modals', 'settings' ]),
    shallowEqual
  )

  return (
    <View
      dataSet={Sessions.dataSet.main}
      style={sessionsStyles.main}
    >
      <SessionsHeader
        styles={sessionsStyles}
        onDayChange={onDayChange}
      />
      {
        // creates a gridContainer separated by hour blocks
        mapObj(
          agendaSessions[settings?.agendaSettings?.activeDayNumber || 1],
          (key, sessions) => {
            return (
              <GridContainer
                key={key}
                sessions={sessions}
                labels={labels}
                timeBlock={key}
              />
            )
          }
        )
      }
      { modals.length > 0 && RenderModals(modals) }
    </View>
  )
}

Sessions.dataSet = {
  main: { class: 'sessions-main' },
  content: {
    header: { class: 'sessions-content-header' },
  },
}
