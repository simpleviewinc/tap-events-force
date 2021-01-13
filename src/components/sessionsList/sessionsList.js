import { View } from '@keg-hub/keg-components/view'
import { useStylesCallback, useDimensions } from '@keg-hub/re-theme'
import { GridContainer } from 'SVContainers/gridContainer'
import { SessionsHeader } from 'SVComponents/sessionsHeader'
import { reduceObj, noPropArr, noOpObj } from '@keg-hub/jsutils'
import { Divider, SectionList } from '@keg-hub/keg-components'
import React, { useMemo, useCallback } from 'react'
import { incrementDay, decrementDay } from 'SVActions/session/dates'
import { EmptyDayMessage } from 'SVComponents/grid/emptyDayMessage'

/**
 * Default scroll offset for the section headers based on the size
 * @number
 */
const sectionOffset = -80

/**
 * Hook to memoize the sessions styles
 * <br/> Also calculates a bottom padding based on gridItem height
 *
 * @returns {Array} - memoized styles for the SectionList
 */
const useListStyles = () => {
  const dims = useDimensions()
  return useStylesCallback((theme, styles, height) => {
    const itemHeight = (theme.get('gridItem')?.main?.minHeight || 300 ) + sectionOffset
    return !height
      ? theme.get('sessionsList')
      : theme.get('sessionsList', {
          content: {
            list: {
              marginBottom: height - itemHeight
            }
          }
        })
  }, [ dims.height ])
}

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
    nextDayStr => {
      const nextDay = parseInt(nextDayStr)
      nextDay < currentDay
        ? decrementDay()
        : nextDay > currentDay && incrementDay()
    },
    [ sections, currentDay ]
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

  const styles = useListStyles()
  const sections = useSessionsSections(sessions)
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
          currentDay={currentDay}
          labels={itemProps.labels}
          onDayChange={onDayChange}
        />
      )}
      renderSectionHeader={({ section: { dayNum, data }, styles }) => {
        return (
          <View style={[
            styles?.content?.section?.main,
            !data.length && styles?.content?.section?.empty
          ]}>
            <Divider style={styles?.content?.section?.divider} />
            {!data.length && (<EmptyDayMessage />)}
          </View>
        )
      }}
    />
  )
}
