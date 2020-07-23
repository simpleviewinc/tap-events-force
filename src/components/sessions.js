import React, { useEffect, useMemo } from 'react'
import { View, Text } from 'react-native'
import { useSessionsStore } from '../store/sessionsStore'
import { mapSessionInterface } from 'SVActions'
import { GridItem, DayToggle } from 'SVComponents'
import { sortLabels, noOp } from 'SVUtils'

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

  store.agendaDays.length && console.log({ store })

  const labels = useMemo(() => sortLabels(store.labels), [store.labels])

  return (
    <View>
      <DayToggle onDayChange={onDayChange} />
      <GridItem labels={labels} />
      <Text>Active session id: { store.activeSession.id }</Text>
      <Text>Sessions count: { store.sessions.length }</Text>
      <Text>Attendees count: { store.attendees.length }</Text>
    </View>
  )
}
