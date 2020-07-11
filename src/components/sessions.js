import React, { useEffect, useMemo } from 'react'
import { View, Text } from 'react-native'
import { useSessionsStore } from '../store/sessionsStore'
import { GridItem, Button } from 'SVComponents'
import { sortLabels } from 'SVUtils'
import testData from '../mocks/eventsforce/testData'
import { mapSessionInterface } from 'SVActions'
import { renderModals } from 'SVComponents/modal'
import { Values } from 'SVConstants'
import { useCreateModal } from 'SVHooks/modal'

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
      { store.modals.length > 0 && renderModals(store.modals) }
    </View>
  )
}
