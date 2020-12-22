import { reduceObj, noPropArr, noPropObj } from '@keg-hub/jsutils'
import React, { useMemo, useState } from 'react'
import { View, Text, Divider } from '@keg-hub/keg-components'
import { SectionList, SafeAreaView } from 'react-native'
import { GridContainer } from 'SVContainers/gridContainer'
import { SessionsHeader } from 'SVComponents/sessionsHeader'
import { useTheme } from '@keg-hub/re-theme'

/**
 * Hook to memoize the sessions for a day, and add a key
 * @param {Array} sessions - group of sessions by day
 *
 * @returns {Array} - memoized sessions in SectionList required format
 */
const useSessionsSections = (sessions) => {
  return useMemo(() => {
    return reduceObj(sessions, (dayNum, timeBlocks, sections) => {
      sections.push({
        dayNum,
        data: timeBlocks.map(timeBlock => {
          timeBlock.key = `${dayNum}-${timeBlock.timeBlock}`
          return timeBlock
        })
      })

      return sections
    }, [])

  }, [sessions])
}

/**
 * SessionList - Container for all sessions separated by day
 * @param {object} props
 * @param {Array<import('SVModels/label').Label>} props.labels - session labels
 * @param {Array} props.onDayChange - Callback method for session day changes
 * @param {Array} props.sessions - group of sessions by day
 * @param {Object} props.settings - Sessions settings from redux store
 * @param {boolean} props.enableFreeLabel - whether to display 'FREE' on session with no pricing or not
 * @param {boolean} props.militaryTime - whether to display time in 12 hr or 24 hr format
 *
 * @returns {Component}
 */
export const SessionList = props => {
  const { settings, sessions, ...itemProps } = props
  const currentDay = settings.agendaSettings.activeDayNumber
  const [ dayNum, setDayNum ] = useState(currentDay)
  
  const sections = useSessionsSections(sessions)
  const theme = useTheme()
  const styles = theme.get('sessionList')

  const onScroll = (event) => {
    console.log(event)
  }

  return (
      <View
        className='section-list-wrapper'
        style={styles?.main}
      >
        <SessionsHeader
          dayNum={dayNum}
          labels={itemProps.labels}
          onDayChange={itemProps.onDayChange}
        />
        <SectionList
          sections={sections}
          onScroll={onScroll}
          renderSectionHeader={({ section: { dayNum } }) => {
            return dayNum !== '1' && (
              <Divider style={styles?.content?.divider} />
            )
          }}
          renderItem={({ item }) => (
            <GridContainer {...itemProps} {...item} />
          )}
        />
      </View>
  )

}