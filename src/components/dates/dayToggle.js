import React, { useMemo } from 'react'
import { View, Icon, Text } from 'SVComponents'
import { useSessionsStore } from '../../store/sessionsStore'
import { useTheme } from '@simpleviewinc/re-theme'
// import { incrementDay, decrementDay } from 'SVActions'

import moment from 'moment'

/**
 * Returns the active session and its session model counterpart
 * @param {Object} store - current store
 * @returns {Object} of form { activeSession, session }
 */
const useActiveSession = () => {
  const store = useSessionsStore()
  return useMemo(() => {
    const activeSession = store.activeSession
    const sessions = store.sessions
    const id = activeSession.id.toString()
    const session = sessions.find(session => session.identifier === id)
    return { activeSession, session, sessions }
  }, [ store.activeSession, store.sessions ])
}

/**
 * SessionComponent
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props - session agenda props defined in evf interface
 */
export const DayToggle = props => {
  const theme = useTheme()

  const { session } = useActiveSession()

  return (
    <View style={theme.get('dayToggle.main')}>
      <Icon name={'chevron-left'} />
      <Text>
        { ' ' }
        Day { getDayNumber(session) } – { getCurrentDayString(session) }{ ' ' }
      </Text>
      <Icon name={'chevron-right'} />
    </View>
  )
}

/**
 * Returns the current day number of the session
 * @param {Session} session
 * @returns {string} day number or '?' if session is undefined
 */
const getDayNumber = session => {
  return session ? session.dayNumber.toString() : '?'
}

/**
 * Returns the current day string
 * @param {Session} session
 * @returns {string} in format like "1 August 2020"
 */
const getCurrentDayString = session => {
  return session ? moment(session.startDateTimeLocal).format('d MMMM YYYY') : ''
}
