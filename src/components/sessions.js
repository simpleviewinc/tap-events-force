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
import { LocalStorage } from 'SVStore/plugins'
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

  const labels = useSelector(store => store.labels)
  const agendaSettings = useSelector(store =>
    get(store, 'settings.agendaSettings')
  )
  const theme = useTheme()

  useEffect(() => {
    // Need to call here, after useSessionsStore executes, so that session dispatch function is set.
    // Also need to configure with our custom dispatch function, otherwise it would use the core's
    LocalStorage.configure({
      paths: ['settings.agendaSettings.activeDayNumber'],
      dispatch,
    })

    // map the evf props onto our states
    mapSessionInterface(sessionData)
  }, [])

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
        date={get(currentAgendaDay, 'date')}
        dayNumber={currentDayNumber}
        disableDecrement={isFirstDay}
        disableIncrement={isLatestDay}
        onDecrement={decrement}
        onIncrement={increment}
      />

      <GridItem
        labels={sortedLabels}
        session={store.sessions[0]}
        militaryTime={is24HourTime}
      />
      <Text>Active session id: { store.activeSession.id }</Text>
      <Text>Sessions count: { store.sessions.length }</Text>
      <Text>Attendees count: { store.attendees.length }</Text>
      <Button onPress={() => toggleTime(is24HourTime)}>
        Toggle 12-hour/24-hour time
      </Button>
      <Button
        themePath='button.contained.primary'
        onClick={useCreateModal(
          Values.MODAL_TYPES.PRESENTER,
          store.presenters[0]
        )}
        content={'Open Presenter 1 (image + short bio)'}
      />
      <Button
        themePath='button.contained.primary'
        onClick={useCreateModal(
          Values.MODAL_TYPES.PRESENTER,
          store.presenters[1]
        )}
        content={'open presenter 2 (no image, no bio)'}
      />
      <Button
        themePath='button.contained.primary'
        onClick={useCreateModal(
          Values.MODAL_TYPES.PRESENTER,
          store.presenters[2]
        )}
        content={'open presenter 3 (long bio text)'}
      />
      { store.modals.length > 0 && RenderModals(store.modals) }
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
