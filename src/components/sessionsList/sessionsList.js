import { useTheme } from '@keg-hub/re-theme'
import { GridContainer } from 'SVContainers/gridContainer'
import { SessionsHeader } from 'SVComponents/sessionsHeader'
import { reduceObj } from '@keg-hub/jsutils'
import { Divider, SectionList } from '@keg-hub/keg-components'
import React, { useMemo, useCallback } from 'react'
import { incrementDay, decrementDay } from 'SVActions/session/dates'

const sectionOffset = 80

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

/**
 * Hook to memoize an onScrollChange callback
 * @param {Array} sections - group of sessions by day
 * @param {number} currentDay - Active day of sessions being rendered
 * @param {function} onDayChange - Callback to be called when the active day changes
 *
 * @returns {Array} - memoized sessions in SectionList required format
 */
const useOnScrollChange = (sections, currentDay, onDayChange) => {
  return useCallback(
    sectionIndex => {
      if (!sections[sectionIndex]) return

      const { dayNum } = sections[sectionIndex]
      const switchToDay = parseInt(dayNum)

      switchToDay < currentDay
        ? decrementDay()
        : switchToDay > currentDay && incrementDay()
    },
    [ sections, currentDay ]
  )
}

/**
 * Hook to memoize an onSectionChange callback
 * @param {Array} sections - group of sessions by day
 * @param {number} currentDay - Active day of sessions being rendered
 * @param {function} onDayChange - Callback to be called when the active day changes
 *
 * @returns {Array} - memoized sessions in SectionList required format
 */
const useOnSectionChange = (sections, currentDay, onDayChange) => {
  return useCallback(sectionIndex => {}, [ sections, currentDay, onDayChange ])
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

  const theme = useTheme()
  const styles = theme.get('sessionsList')
  const currentDay = settings.agendaSettings.activeDayNumber || 1

  const sections = useSessionsSections(sessions)
  const onScrollSectionChange = useOnScrollChange(
    sections,
    currentDay,
    onDayChange
  )
  const onSectionChange = useOnSectionChange(sections, currentDay, onDayChange)

  return (
    <SectionList
      styles={styles}
      sections={sections}
      onSectionChange={onSectionChange}
      sectionChangeOffset={sectionOffset}
      onScrollSectionChange={onScrollSectionChange}
      renderListHeader={({ onSectionChange: onDayChange }) => (
        <SessionsHeader
          currentDay={currentDay}
          labels={itemProps.labels}
          onDayChange={onDayChange}
        />
      )}
      renderSectionHeader={({ section: { dayNum }, styles }) => {
        return (
          <Divider
            style={
              dayNum === '1'
                ? styles?.content?.hidden
                : styles?.content?.divider
            }
          />
        )
      }}
      renderItem={({ item }) => {
        return <GridContainer {...item} />
      }}
    />
  )
}
