import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSessionsStore } from '../store/sessionsStore'
import { mapSessionInterface } from 'SVActions'

/**
 * SessionComponent
 * @param {import('SVModels/sessionAgendaProps').sessionAgendaProps} props - session agenda props defined in evf interface
 */
export const SessionsComponent = props => {
  const store = useSessionsStore()
  console.log(store)
  // map the evf props onto our states
  useEffect(() => {
    mapSessionInterface(props)
  }, [])

  return (
    <View>
      <Text>Active session id: { store.activeSession.id }</Text>
      <Text>Sessions count: { store.sessions.length }</Text>
      <Text>Attendees count: { store.attendees.length }</Text>
      <Text>
        Location In Agenda:{ ' ' }
        { store.settings.agendaSettings.showLocationInAgenda.toString() }
      </Text>
    </View>
  )
}
