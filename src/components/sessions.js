import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useTheme } from '@simpleviewinc/re-theme'
import testData from '../mocks/eventsforce/testData'
import { mapSessionInterface } from 'SVActions'
import { RenderModals } from 'SVComponents/modal'
import { GridContainer } from 'SVContainers/gridContainer'
import moment from 'moment'
import { mapObj, get } from 'jsutils'
import { useSelector } from 'react-redux'
import { buildHourSessionsMap } from 'SVUtils'
import { useQuery } from 'SVHooks'

/**
 * SessionComponent
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props - session agenda props defined in evf interface
 */
export const Sessions = props => {
  const store = useSelector(state => state.items)
  const theme = useTheme()

  // TODO: remove 'useQuery' once day switcher is implemented
  const query = useQuery()
  const sessionsMap = buildHourSessionsMap(
    store.sessions,
    get(query, 'day') || 1
  )

  // map the evf props onto our states
  useEffect(() => {
    // placeholder data for now
    mapSessionInterface(testData)
  }, [])

  return (
    <View
      data-class='sessions-main'
      style={theme.get('sessions.main')}
    >
      {
        // creates a gridContainer separated by hour blocks
        mapObj(sessionsMap, (key, sessions) => {
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
