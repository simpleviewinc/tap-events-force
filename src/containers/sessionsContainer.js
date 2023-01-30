import React, { useEffect } from 'react'
import { Sessions } from 'SVComponents/sessions'
import { Loading } from 'SVComponents'
import { initSessions } from 'SVActions/session/initSessions'
import { useSelector } from 'react-redux'
import { ComponentsProvider } from 'SVContexts/components/componentsProvider'
import { VersionDisplay } from 'SVComponents/meta/versionDisplay'

/**
 * Container for Sessions
 * @param {Object} props
 * @param {Object} props.sessionAgendaProps - data structured like src/mocks/eventsforce/testData
 * @param {Function} props.onDayChange - function that executes when user changes day of agenda
 * @param {Function} props.onSessionBookingRequest - callback for session booking request action.
 *                                                 - passes back session id and an array of attendee ids
 * @param {Function} props.onSessionWaitingListRequest - callback for session waiting list request action,
 *                                                 - of form (sessionId, attendeeIds) => {}
 *                                                  - passes back session id and an array of attendee ids
 * @param {Function} props.ModalComponent - React component or function to allow rendering content in a modal
 * @param {Function} props.ButtonComponent - React component or function to allow rendering a button
 * @param {Boolean} props.showVersion - if true, displays the version of the tap
 *
 */
export const SessionsContainer = props => {
  const {
    onDayChange,
    onSessionBookingRequest,
    onSessionWaitingListRequest,
    sessionAgendaProps,
    ModalComponent,
    ButtonComponent,
    CheckboxComponent,
    AgendaLayoutRenderer,
    showVersion,
    showPresenterDetailsModal,
    SessionDetailsModalContents,
  } = props

  useEffect(() => void initSessions(), [])

  const isReady = useSelector(store => store.tap?.initialized)

  return isReady ? (
    <ComponentsProvider
      ButtonComponent={ButtonComponent}
      ModalComponent={ModalComponent}
      CheckboxComponent={CheckboxComponent}
      SessionDetailsModalContents={SessionDetailsModalContents}
      AgendaLayoutRenderer={AgendaLayoutRenderer}
    >
      { showVersion && <VersionDisplay /> }
      <Sessions
        onDayChange={onDayChange}
        sessionAgendaProps={sessionAgendaProps}
        onSessionBookingRequest={onSessionBookingRequest}
        onSessionWaitingListRequest={onSessionWaitingListRequest}
        showPresenterDetailsModal={showPresenterDetailsModal}
      />
    </ComponentsProvider>
  ) : (
    <Loading />
  )
}
