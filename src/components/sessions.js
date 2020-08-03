import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useTheme } from '@simpleviewinc/re-theme'
import testData from '../mocks/eventsforce/testData'
import { mapSessionInterface } from 'SVActions'
import { RenderModals } from 'SVComponents/modal'
import { GridContainer } from 'SVContainers/gridContainer'
import moment from 'moment'
import { mapObj } from 'jsutils'
import { useSelector } from 'react-redux'
import { filterSessionByDayNumber } from 'SVUtils'

/**
 * SessionComponent
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props - session agenda props defined in evf interface
 */
export const Sessions = props => {
  const store = useSelector(state => state.items)
  const theme = useTheme()

  // map the evf props onto our states
  useEffect(() => {
    // placeholder data for now
    mapSessionInterface(testData)
  }, [])

  const filteredSessions = filterSessionByDayNumber(store.sessions, 2)
  return (
    <View
      data-class='sessions-main'
      style={theme.get('sessions.main')}
    >
      {
        // creates a gridContainer separated by hour blocks
        mapObj(filteredSessions, (key, sessions) => {
          return (
            <GridContainer
              key={key}
              sessions={sessions}
              labels={store.labels}
              timeBlock={moment().hour(key)
                .format('HH:00')}
            />
          )
        })
      }
      { store.modals.length > 0 && RenderModals(store.modals) }
    </View>
  )
}
