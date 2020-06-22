import React from 'react'
import { View, Text } from 'react-native'
import { useSessionsStore } from '../store/sessionsStore'
/**
 * SessionComponent
 * @param {import('SVModels/sessionAgendaProps').sessionAgendaProps} props - session agenda props defined in evf interface
 */
export const SessionsComponent = props => {
  const store = useSessionsStore()
  return (
    <View>
      <Text>Active session id: { store.activeSession.id }</Text>
    </View>
  )
}
