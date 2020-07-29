import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSessionsStore, dispatch } from '../store/sessionsStore'
import { Button } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'
import { get } from 'jsutils'
import testData from '../mocks/eventsforce/testData'
import { mapSessionInterface } from 'SVActions'
import { RenderModals } from 'SVComponents/modal'
import { Values } from 'SVConstants'
import { useCreateModal } from 'SVHooks/modal'
import { GridContainer } from 'SVContainers/gridContainer'

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

  const is24HourTime = get(store, 'settings.agendaSettings.militaryTime', false)

  return (
    <View
      data-class='sessions-main'
      style={theme.get('sessions.main')}
    >
      <GridContainer
        sessions={store.sessions}
        labels={store.labels}
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
