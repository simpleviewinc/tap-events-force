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
import moment from 'moment'
import { mapObj } from 'jsutils'

/**
 *
 * @param {Array<import('SVModels/session').Session>} sessions
 * @param {number} hour - any number from 1-24
 */
const filterSessionByTimeHr = (sessions, hour) => {
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

  // assume start 6 am && ends at 6 pm. verify with Ben
  // 1. loop through possible working hours
  // 2. filter sessions for each hour and store them in kvp
  // resulting obj looks something like
  // {6:[], 7:[sessionA, sessionB, etc], 8:[sessionC, etc]}
  let sessionsFilteredByHour = {}
  for (let i = 6; i < 18; i++) {
    sessionsFilteredByHour[i] = filterSessionByTimeHr(filteredSessions, i)
  }
  return sessionsFilteredByHour
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
