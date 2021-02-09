import { format, parseISO } from 'date-fns'
import { isMobileSize } from 'SVUtils/theme'
import { useTheme } from '@keg-hub/re-theme'
import { reduceObj } from '@keg-hub/jsutils'
import React, { useMemo, useCallback } from 'react'
import { SessionsDivider } from './sessionsDivider'
import { useAgenda } from 'SVHooks/models/useAgenda'
import { GridContainer } from 'SVContainers/gridContainer'
import { SessionsHeader } from 'SVComponents/sessionsHeader'
import { SectionList } from '@keg-hub/keg-components/sectionList'
import { useStylesCallback, useDimensions } from '@keg-hub/re-theme'
import { setDay } from 'SVActions/session/dates'

/**
 * Default scroll offset for the section headers based on the size
 * @number
 */
const sectionOffset = -45

/**
 * Hook to memoize the sessions styles
 * <br/> Also calculates a bottom padding based on gridItem height
 *
 * @returns {Array} - memoized styles for the SectionList
 */
const useListStyles = () => {
  const dims = useDimensions()
  return useStylesCallback(
    (theme, styles, height) => {
      const itemHeight =
        (theme.get('gridItem')?.main?.minHeight || 300) + sectionOffset
      return !height
        ? theme.get('sessionsList')
        : theme.get('sessionsList', {
          content: {
            list: {
              marginBottom: height - itemHeight,
            },
          },
        })
    },
    [dims.height]
  )
}

/**
 * Hook to map the day numbers to the day text that's displayed
 * <br/> Get's the correct Day text based on current viewport size
 * @param {Array} agendaDays - Group of days from the current agenda
 * @param {boolean} isMobile - Is the current size of the viewport mobile
 *
 * @returns {Object} - Mapped day numbers to displayed day text
 */
const useDateTextByDay = (agendaDays, isMobile) => {
  const dateList = agendaDays.map(day => day.date).join(',')
  return useMemo(() => {
    return agendaDays.reduce((mapped, { date, dayNumber }) => {
      const dayName = date && format(parseISO(date), 'EEEE')
      mapped[dayNumber] = isMobile
        ? `Day ${dayNumber} ${dayName}`.trim()
        : `Day ${dayNumber}`

      return mapped
    }, {})
  }, [ dateList, isMobile ])
}

/**
 * Hook to memoize the sessions for a day, and add a key
 * @param {Array} sessions - group of sessions by day
 *
 * @returns {Array} - memoized sessions in SectionList required format
 */
const useSessionsSections = (sessions, dateByDay) => {
  return useMemo(() => {
    return reduceObj(
      sessions,
      (dayNum, timeBlocks, sections) => {
        sections.push({
          dayNum,
          // Is the first section if no sections have been added
          first: !sections.length,
          // Is the last section, if total sections === total sessions minus one
          last: Object.keys(sessions).length - 1 === sections.length,
          // Store the text to displace above each day
          dayText: dateByDay[dayNum],
          data: timeBlocks.map(timeBlock => {
            timeBlock.key = `${dayNum}-${timeBlock.timeBlock}`
            return timeBlock
          }),
        })

        return sections
      },
      []
    )
  }, [ sessions, dateByDay ])
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
    nextDayStr => {
      const nextDay = parseInt(nextDayStr)
      setDay(nextDay, onDayChange)
    },
    [ sections, currentDay, onDayChange ]
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

  const theme = useTheme()
  const agenda = useAgenda()
  const styles = useListStyles()
  const isMobile = isMobileSize(theme)
  const dateByDay = useDateTextByDay(agenda.agendaDays, isMobile)
  const sections = useSessionsSections(sessions, dateByDay)
  const onScrollSectionChange = useOnScrollChange(
    sections,
    currentDay,
    onDayChange
  )

  return (
    <SectionList
      styles={styles}
      sections={sections}
      activeSection={currentDay}
      indexSectionHeaderBy={'dayNum'}
      sectionChangeOffset={sectionOffset}
      onScrollSectionChange={onScrollSectionChange}
      renderItem={({ item }) => <GridContainer
        {...item}
        {...itemProps}
      />}
      renderListHeader={({ onSectionChange: onDayChange }) => (
        <SessionsHeader
          agenda={agenda}
          currentDay={currentDay}
          labels={itemProps.labels}
          onDayChange={onDayChange}
        />
      )}
      renderSectionHeader={({ section, styles }) => (
        <SessionsDivider
          styles={styles}
          first={section.first}
          last={section.last}
          isMobile={isMobile}
          dayNum={section?.dayNum}
          dayText={section?.dayText}
          hasSessions={Boolean(section?.data.length)}
        />
      )}
    />
  )
}
