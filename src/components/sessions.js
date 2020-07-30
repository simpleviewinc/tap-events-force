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
/**
 * Filters the sessions for sessions that start at a given hour
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {number} hour - any number from 1-24
 */
const filterSessionByHour = (sessions, hour) => {
  return sessions.filter(
    session => moment(session.startDateTimeLocal).hour() === hour
  )
}

/**
 * Filters the sessions given a day number
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {number} dayNumber
 * @returns {object} - where key is the hour, value is the array of sessions
 */
const filterSessionByDayNumber = (sessions, dayNumber) => {
  // filter for sessions on the given day number
  const filteredSessions = sessions.filter(
    session => session.dayNumber === dayNumber
  )

  // 1. loop through possible start session hours
  // 2. filter sessions for each hour and store them in kvp
  // resulting obj looks something like
  // {6:[], 7:[sessionA, sessionB, etc], 8:[sessionC, etc]}
  let sessionsFilteredByHour = {}
  for (let i = 1; i < 24; i++) {
    sessionsFilteredByHour[i] = filterSessionByHour(filteredSessions, i)
  }
  return sessionsFilteredByHour
}
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
