import { reduceObj, noPropArr, noPropObj } from '@keg-hub/jsutils'
import React, { useMemo } from 'react'
import { View, Text } from '@keg-hub/keg-components'
import { SectionList } from 'react-native'
import { GridContainer } from 'SVContainers/gridContainer'
import { SessionsHeader } from 'SVComponents/sessionsHeader'

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
TODO: Find way to set height of section list wrapper
Without a height set, the sticky section headers don't work
body {
  overflow: hidden;
  height: 100vh;
}

keg-view.section-list-wrapper > div {
  max-height: 100vh;
}

keg-view.section-list-wrapper > div > div {
  flex: 1;
  overflow-y: scroll;
}

*/


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
  
  const sections = useSessionsSections(sessions)

  return (
    <View className='section-list-wrapper' >
      <SectionList
        stickySectionHeadersEnabled={true}
        sections={sections}
        renderSectionHeader={({ section: { dayNum } }) => (
          <SessionsHeader
            dayNum={dayNum}
            labels={itemProps.labels}
            onDayChange={itemProps.onDayChange}
          />
        )}
        renderItem={({ item }) => (
          <GridContainer {...itemProps} {...item} />
        )}
      />
    </View>
  )

}