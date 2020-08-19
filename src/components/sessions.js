import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useTheme } from '@simpleviewinc/re-theme'
import testData from '../mocks/eventsforce/testData'
import { mapSessionInterface } from 'SVActions'
import { RenderModals } from 'SVComponents/modal/renderModals'
import { GridContainer } from 'SVContainers/gridContainer'
import { mapObj } from '@ltipton/jsutils' // -- get
import { useSelector, shallowEqual } from 'react-redux'
// import { useQuery } from 'SVHooks'

/**
 * SessionComponent
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props - session agenda props defined in evf interface
 */
export const Sessions = props => {
  const store = useSelector(
    ({ items }) => ({
      agendaSessions: items.agendaSessions,
      labels: items.labels,
      modals: items.modals,
    }),
    shallowEqual
  )

  const theme = useTheme()

  // replace this once day switcher is implemented
  const day = 2

  // map the evf props onto our states
  useEffect(() => {
    // placeholder data for now
    mapSessionInterface(testData)
  }, [])

  return (
    <View
      dataSet={Sessions.dataSet.main}
      style={theme.get('sessions.main')}
    >
      {
        // creates a gridContainer separated by hour blocks
        mapObj(store.agendaSessions[day], (key, sessions) => {
          return (
            <GridContainer
              key={key}
              sessions={sessions}
              labels={store.labels}
              timeBlock={key}
            />
          )
        })
      }
      { store.modals.length > 0 && RenderModals(store.modals) }
    </View>
  )
}

Sessions.dataSet = {
  main: { class: 'sessions-main' },
}
