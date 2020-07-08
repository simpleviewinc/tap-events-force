import React, { useEffect, useMemo } from 'react'
import { View, Text } from 'react-native'
import { useSessionsStore } from '../store/sessionsStore'
import { mapSessionInterface } from 'SVActions'
import { GridItem } from 'SVComponents'
import { sortLabels } from 'SVUtils'
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

  const labels = useMemo(() => sortLabels(store.labels), [store.labels])

  return (
    <View>
      <GridItem labels={labels} />
      <Text>Active session id: { store.activeSession.id }</Text>
      <Text>Sessions count: { store.sessions.length }</Text>
      <Text>Attendees count: { store.attendees.length }</Text>
      <Button
        themePath='button.contained.primary'
        onClick={() =>
          addModal(new Modal({ type: 'presenter', data: store.presenters[0] }))
        }
        content={'Open Presenter 1'}
      />
      <Button
        themePath='button.contained.primary'
        onClick={() => removeModal()}
        content={'Remove modal'}
      />
      { store.modals.length > 0 && renderModal(store.modals) }
    </View>
  )
}
