import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSessionsStore } from '../store/sessionsStore'
import { mapSessionInterface } from 'SVActions'
import { LabelList } from 'SVComponents'
import testData from '../mocks/eventsforce/testData'

/**
 * SessionComponent
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props - session agenda props defined in evf interface
 */
export const Sessions = props => {
  const store = useSessionsStore()

  // map the evf props onto our states
  useEffect(() => {
    // placeholder data for now
    mapSessionInterface(testData)
  }, [])

  return (
    <View>
      <div style={{ height: 200, display: 'flex', flexDirection: 'row' }}>
        <LabelList
          labels={store.labels}
          onItemPress={console.log}
          style={{}}
        />
        <p>Title</p>
      </div>
      <Text>Active session id: { store.activeSession.id }</Text>
      <Text>Sessions count: { store.sessions.length }</Text>
      <Text>Attendees count: { store.attendees.length }</Text>
    </View>
  )
}
