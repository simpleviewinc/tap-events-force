import React, { useEffect } from 'react'
import { View } from '@old-keg-hub/keg-components'
import { ModalManager } from 'SVComponents/modals/modalManager'
import { mapSessionInterface } from 'SVActions/session/mapSessionInterface'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { noOp } from 'SVUtils/helpers/method/noop'
import { SessionsList } from 'SVComponents/sessionsList'
import { useBookingRequestEvent } from 'SVHooks/booking/useBookingRequestEvent'
import { isMobileSize } from 'SVUtils/theme'
import { useTheme } from '@keg-hub/re-theme'

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
    showPresenterDetailsModal,
  } = props

  // set up our event listener for booking and waiting list requests
  useBookingRequestEvent(onSessionBookingRequest, onSessionWaitingListRequest)

  useEffect(() => {
    mapSessionInterface(sessionAgendaProps)
  }, [sessionAgendaProps])

  const { labels, agendaSessions, settings } = useStoreItems([
    'labels',
    'agendaSessions',
    'settings',
  ])

  const theme = useTheme()
  const isMobile = isMobileSize(theme)

  let containerClasses = 'ef-sessions-background'
  if (isMobile) {
    containerClasses += ' ef-sessions-mobile'
  }

  return (
    <View className={containerClasses}>
      <SessionsList
        labels={labels}
        onDayChange={onDayChange}
        settings={settings}
        sessions={agendaSessions}
        militaryTime={settings?.displayProperties?.timeFormat === '24'}
        showPresenterDetailsModal={showPresenterDetailsModal}
      />
      <ModalManager />
    </View>
  )
}
