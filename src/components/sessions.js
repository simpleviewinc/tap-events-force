import React, { useEffect, useMemo } from 'react'
import { View, Text } from 'react-native'
import { useSessionsStore } from '../store/sessionsStore'
import { mapSessionInterface } from 'SVActions'
import { GridItem } from 'SVComponents'
import { sortLabels } from 'SVUtils'
import testData from '../mocks/eventsforce/testData'

/**
 * TODO: Move to utils
 * @param {Array} types
 */
const renderModals = types => {
  console.log(types)
  return types.map(type => {
    switch (type) {
    case Values.MODAL_TYPES.ERROR:
      return ModalError
    case Values.MODAL_TYPES.PRESENTERS:
      return null
    case Values.MODAL_TYPES.FILTER:
      return ModalFilter
    default:
      return null
    }
  })
}

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
        onClick={() => addModal(Values.MODAL_TYPES.ERROR, cb)}
        content={'toggle modal error'}
      />
      <Button
        themePath='button.contained.primary'
        onClick={() => addModal(Values.MODAL_TYPES.FILTER, cb)}
        content={'toggle modal filter'}
      />
      <Button
        themePath='button.contained.primary'
        onClick={() => {
          removeModal(store.modals)
        }}
        content={'remove modal no index'}
      />

      <Button
        themePath='button.contained.primary'
        onClick={() => {
          removeModal(store.modals, 5)
        }}
        content={'remove modal with index'}
      />
      { renderModals(store.modals) }
    </View>
  )
}
