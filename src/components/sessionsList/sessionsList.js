import { useTheme } from '@keg-hub/re-theme'
import { scrollList } from 'SVUtils/scroll/scrollList'
import { GridContainer } from 'SVContainers/gridContainer'
import { SessionsHeader } from 'SVComponents/sessionsHeader'
import { reduceObj, checkCall } from '@keg-hub/jsutils'
import { Divider, SectionList } from '@keg-hub/keg-components'
import React, { useMemo, useRef, useCallback } from 'react'

/**
 * Hook to memoize the sessions for a day, and add a key
 * @param {Array} sessions - group of sessions by day
 *
 * @returns {Array} - memoized sessions in SectionList required format
 */
const useSessionsSections = sessions => {
  return useMemo(() => {
    return reduceObj(
      sessions,
      (dayNum, timeBlocks, sections) => {
        sections.push({
          dayNum,
          data: timeBlocks.map(timeBlock => {
            timeBlock.key = `${dayNum}-${timeBlock.timeBlock}`
            return timeBlock
          }),
        })

        return sections
      },
      []
    )
  }, [sessions])
}

const SectionDivider = ({ dayNum, sectionRefs, styles }) => {
  const dividerStyle =
    dayNum === '1' ? styles?.content?.hidden : styles?.content?.divider

  return (
    <Divider
      ref={element => (sectionRefs.current[dayNum] = element)}
      style={dividerStyle}
    />
  )
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
export const SessionsList = props => {
  const { settings, sessions, onDayChange, ...itemProps } = props
  const currentDay = settings.agendaSettings.activeDayNumber || 1
  const sections = useSessionsSections(sessions)
  const theme = useTheme()
  const styles = theme.get('sessionsList')

  const sectionRefs = useRef({})

  const changeDays = useCallback(
    dayChange => {
      scrollList(sectionRefs.current[dayChange])
      checkCall(onDayChange, dayChange)
    },
    [ currentDay, onDayChange, sectionRefs && sectionRefs.current ]
  )

  return (
    <SectionList
      styles={styles}
      sections={sections}
      renderListHeader={() => (
        <SessionsHeader
          currentDay={currentDay}
          labels={itemProps.labels}
          onDayChange={changeDays}
        />
      )}
      renderSectionHeader={({ section: { dayNum } }) => {
        return (
          <SectionDivider
            sectionRefs={sectionRefs}
            styles={styles}
            dayNum={dayNum}
            currentDay={currentDay}
          />
        )
      }}
      renderItem={({ item }) => {
        return <GridContainer {...item} />
      }}
    />
  )
}
