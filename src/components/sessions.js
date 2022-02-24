import React, { useEffect } from 'react'
import { useStyle } from '@keg-hub/re-theme'
import { View } from '@keg-hub/keg-components'
import { ModalManager } from 'SVComponents/modals/modalManager'
import { mapSessionInterface } from 'SVActions/session/mapSessionInterface'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { noOp } from 'SVUtils/helpers/method/noop'
import { SessionsList } from 'SVComponents/sessionsList'
import { useBookingRequestEvent } from 'SVHooks/booking/useBookingRequestEvent'

/**
 * SessionComponent
 * @param {Object} props
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props.sessionAgendaProps - session agenda props defined in evf interface
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 * @param {Function} props.onSessionBookingRequest - callback for session booking
 * @param {Function} props.onSessionWaitingListRequest - callback for session wait list booking
 */
export const Sessions = props => {
  const {
    onDayChange = noOp,
    sessionAgendaProps,
    onSessionBookingRequest = noOp,
    onSessionWaitingListRequest = noOp,
  } = props

  // set up our event listener for booking and waiting list requests
  useBookingRequestEvent(onSessionBookingRequest, onSessionWaitingListRequest)

  useEffect(() => {
    mapSessionInterface(sessionAgendaProps)
  }, [sessionAgendaProps])

  const sessionsStyles = useStyle('sessions')

  const { labels, agendaSessions, settings } = useStoreItems([
    'labels',
    'agendaSessions',
    'settings',
  ])

  return (
    <View
      className={'ef-sessions-background'}
      style={sessionsStyles.main}
    >
      <SessionsList
        labels={labels}
        onDayChange={onDayChange}
        settings={settings}
        sessions={agendaSessions}
        militaryTime={settings?.displayProperties?.timeFormat === '24'}
      />
      <ModalManager />
    </View>
  )
}
