import React, { useEffect, useCallback, useMemo } from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { useAgenda, useCreateModal } from 'SVHooks'
import {
  View,
  Text,
  GridItem,
  DayToggle,
  Button,
  RenderModals,
} from 'SVComponents'
import { dispatch } from 'SVStore'
import { useSelector } from 'react-redux'
import { mapSessionInterface, incrementDay, decrementDay } from 'SVActions'
import { sortLabels, noOp } from 'SVUtils'
import { Values } from 'SVConstants'
import { get } from 'jsutils'

/**
 * SessionComponent
 * @param {Object} props
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props.sessionData - session agenda props defined in evf interface
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 */
export const Sessions = props => {
  const { onDayChange = noOp, sessionData } = props

  const theme = useTheme()

  // store data
  const labels = useSelector(({ items }) => items.labels)
  const sessions = useSelector(({ items }) => items.sessions)
  const presenters = useSelector(({ items }) => items.presenters)
  const attendees = useSelector(({ items }) => items.attendees)
  const activeSession = useSelector(({ items }) => items.activeSession)
  const modals = useSelector(({ items }) => items.modals)
  const agendaSettings = useSelector(({ items }) =>
    get(items, 'settings.agendaSettings')
  )

  useEffect(() => void mapSessionInterface(sessionData), [])

  const sortedLabels = useMemo(() => sortLabels(labels), [labels])
  const is24HourTime = get(agendaSettings, 'militaryTime', false)

  const {
    currentAgendaDay = {},
    currentDayNumber,
    isLatestDay,
    isFirstDay,
  } = useAgenda()

  const increment = useCallback(() => incrementDay(onDayChange), [onDayChange])
  const decrement = useCallback(() => decrementDay(onDayChange), [onDayChange])

  return (
    <View style={theme.get('sessions.main')}>
      <DayToggle
        style={theme.get('sessions.dayToggle')}
        date={get(currentAgendaDay, 'date')}
        dayNumber={currentDayNumber}
        disableDecrement={isFirstDay}
        disableIncrement={isLatestDay}
        onDecrement={decrement}
        onIncrement={increment}
      />

      <GridItem
        labels={sortedLabels}
        session={sessions[0]}
        militaryTime={is24HourTime}
      />
      <Text>Active session id: { activeSession.id }</Text>
      <Text>Sessions count: { sessions.length }</Text>
      <Text>Attendees count: { attendees.length }</Text>
      <Button onPress={() => toggleTime(is24HourTime)}>
        Toggle 12-hour/24-hour time
      </Button>
      <Button
        themePath='button.contained.primary'
        onClick={useCreateModal(Values.MODAL_TYPES.PRESENTER, presenters[0])}
        content={'Open Presenter 1 (image + short bio)'}
      />
      <Button
        themePath='button.contained.primary'
        onClick={useCreateModal(Values.MODAL_TYPES.PRESENTER, presenters[1])}
        content={'open presenter 2 (no image, no bio)'}
      />
      <Button
        themePath='button.contained.primary'
        onClick={useCreateModal(Values.MODAL_TYPES.PRESENTER, presenters[2])}
        content={'open presenter 3 (long bio text)'}
      />
      { modals.length > 0 && RenderModals(modals) }
    </View>
  )
}

// solely for testing - remove later
const toggleTime = is24HourTime => {
  dispatch({
    type: 'UPSERT_ITEM',
    payload: {
      category: 'settings',
      key: 'agendaSettings',
      item: {
        militaryTime: !is24HourTime,
      },
    },
  })
}
