import React, { useEffect, useMemo } from 'react'
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

  const { labels, agendaSessions, settings, sessions } = useStoreItems([
    'labels',
    'agendaSessions',
    'settings',
    'sessions',
  ])

  // - if no session item contains price info. don't display any price label
  // - if some session items do have price. the one's that do not, need to have 'free' label
  const enableFreeLabel = useMemo(() => {
    return sessions.some(session => session.price?.amount > 0)
  }, [sessions])

  return (
    <View
      className={'ef-sessions-background'}
      style={sessionsStyles.main}
    >
      <SessionsList
        labels={labels}
        onDayChange={onDayChange}
        enableFreeLabel={enableFreeLabel}
        settings={settings}
        sessions={agendaSessions}
        militaryTime={settings?.displayProperties?.timeFormat === '24'}
      />
      <ModalManager />
    </View>
  )
}
