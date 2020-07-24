import React, { useEffect, useMemo } from 'react'
import { View, Text } from 'react-native'
import { useSessionsStore } from '../store/sessionsStore'
import { mapSessionInterface } from 'SVActions'
import { GridItem, Button } from 'SVComponents'
import { sortLabels } from 'SVUtils'
import { useTheme } from '@simpleviewinc/re-theme'
import { get } from 'jsutils'
import testData from '../mocks/eventsforce/testData'

/**
 * SessionComponent
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props - session agenda props defined in evf interface
 */
export const Sessions = props => {
  const store = useSessionsStore()
  const theme = useTheme()

  // map the evf props onto our states
  useEffect(() => {
    // placeholder data for now
    mapSessionInterface(testData)
  }, [])

  const labels = useMemo(() => sortLabels(store.labels), [store.labels])
  const is24HourTime = get(store, 'settings.agendaSettings.militaryTime', false)

  return (
    <View style={theme.get('sessions.main')}>
      <GridItem
        labels={labels}
        session={store.sessions[0]}
        militaryTime={is24HourTime}
      />
      <Text>Active session id: { store.activeSession.id }</Text>
      <Text>Sessions count: { store.sessions.length }</Text>
      <Text>Attendees count: { store.attendees.length }</Text>
      <Button onPress={() => toggleTime(is24HourTime)}>
        Toggle 12-hour/24-hour time
      </Button>
    </View>
  )
}

import { dispatch } from '../store/sessionsStore'
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
