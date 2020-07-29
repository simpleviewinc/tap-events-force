import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useSessionsStore } from '../store/sessionsStore'
import { Button } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'
import testData from '../mocks/eventsforce/testData'
import { mapSessionInterface } from 'SVActions'
import { RenderModals } from 'SVComponents/modal'
import { Values } from 'SVConstants'
import { useCreateModal } from 'SVHooks/modal'
import { GridContainer } from 'SVContainers/gridContainer'
import { getTimeFromDate } from 'SVUtils'
import moment from 'moment'

/**
 *
 * @param {Array} sessions
 * @param {number} hour - any number from 1-24
 */
const filterSessionByTimeHr = (sessions, hour) => {
  return sessions.filter(session => {
    console.log(moment(session.startDateTimeLocal).hour())
    return moment(session.startDateTimeLocal).hour() === hour
  })
}

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
  console.log(store)
  const filteredSessions = filterSessionByTimeHr(store.sessions, 9)
  return (
    <View
      data-class='sessions-main'
      style={theme.get('sessions.main')}
    >
      <GridContainer
        sessions={filteredSessions}
        labels={store.labels}
        timeBlock={getTimeFromDate(9)}
      />
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
