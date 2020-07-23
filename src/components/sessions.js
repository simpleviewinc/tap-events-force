import React, { useEffect, useCallback, useMemo } from 'react'
import { useSessionsStore, dispatch } from '../store/sessionsStore'
import { mapSessionInterface, incrementDay, decrementDay } from 'SVActions'
import { View, Text, GridItem, DayToggle } from 'SVComponents'
import { sortLabels, noOp } from 'SVUtils'
import { useAgenda } from 'SVHooks'
import { get } from 'jsutils'
import { useLocalStorage } from '../hooks/useLocalStorage'

/**
 * SessionComponent
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props - session agenda props defined in evf interface
 */
export const Sessions = props => {
  const { onDayChange = noOp, ...sessionData } = props

  const store = useSessionsStore()

  // map the evf props onto our states
  useEffect(() => {
    // placeholder data for now
    mapSessionInterface(sessionData)
  }, [])

  useLocalStorage(store, dispatch, ['settings.agendaSettings.activeDayNumber'])

  useEffect(() => {}, [store.settings.agendaSettings])

  store.agendaDays.length && console.log({ store })

  const labels = useMemo(() => sortLabels(store.labels), [store.labels])

  const {
    currentAgendaDay = {},
    currentDayNumber,
    isLatestDay,
    isFirstDay,
  } = useAgenda()

  const increment = useCallback(() => incrementDay(onDayChange), [onDayChange])
  const decrement = useCallback(() => decrementDay(onDayChange), [onDayChange])

  return (
    <View>
      <DayToggle
        date={get(currentAgendaDay, 'date')}
        dayNumber={currentDayNumber}
        disableDecrement={isFirstDay}
        disableIncrement={isLatestDay}
        onDecrement={decrement}
        onIncrement={increment}
      />

      <GridItem labels={labels} />
      <Text>Active session id: { store.activeSession.id }</Text>
      <Text>Sessions count: { store.sessions.length }</Text>
      <Text>Attendees count: { store.attendees.length }</Text>
    </View>
  )
}
