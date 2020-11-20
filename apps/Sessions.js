import '../src/theme/theme.config'
import React, { useState } from 'react'
import { theme } from 'SVTheme'
import {
  ReThemeProvider,
  getDefaultTheme,
  setRNDimensions,
} from '@keg-hub/re-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'
import { SessionsContainer } from 'SVContainers/sessionsContainer'
import { Dimensions, Platform } from 'react-native'

setRNDimensions(Dimensions)

/**
 * The sessions app for events force. This is the entry point of the 
 * rollup build and it is the root component exported by the build.
 * @param {Object} props - session data, including callbacks, passed to SessionsContainer. @see src/mocks/eventsforce/testData 
 * @param {Function} props.ModalComponent - React component or function to allow rendering content in a modal
 */
const SessionsApp = ({ sessionAgendaProps, onDayChange, onSessionBookingRequest, onSessionWaitingListRequest, ModalComponent }) => {
  const [ activeTheme ] = useState(getDefaultTheme())
  
  return (
    <Provider store={getStore()}>
      <ReThemeProvider theme={activeTheme}>
        <SessionsContainer 
          sessionAgendaProps={sessionAgendaProps}
          onDayChange={onDayChange}
          onSessionBookingRequest={onSessionBookingRequest}
          onSessionWaitingListRequest={onSessionWaitingListRequest}
          ModalComponent={ModalComponent}
        />
      </ReThemeProvider>
    </Provider>
  )
}

export default SessionsApp
