import { useTheme } from '@keg-hub/re-theme'
import { scrollList } from 'SVUtils/scroll/scrollList'
import { GridContainer } from 'SVContainers/gridContainer'
import { SessionsHeader } from 'SVComponents/sessionsHeader'
import { reduceObj, checkCall } from '@keg-hub/jsutils'
import { Divider, SectionList } from '@keg-hub/keg-components'
import React, { useMemo, useRef, useCallback } from 'react'
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
 * Callback method passed into the element.measure method to get it's location information
 * <br/> Normalizes the layout of the element current location relative to the window
 * @param {number} x - X-axis location of the Element relative to it's parent
 * @param {number} y - Y-axis location of the Element relative to it's parent
 * @param {number} width - Width of the Element
 * @param {number} height - Height of the Element
 * @param {number} pageX - X-axis location of the Element relative to the window
 * @param {number} pageY - Y-axis location of the Element relative to the window
 *
 * @returns {Object} - Layout object to match boundingClientRect object of the dom
 */
const normalizeLayout = (x, y, width, height, pageX, pageY) => ({
  height,
  width,
  y: pageY,
  x: pageX,
  top: pageY,
  left: pageX,
})

/**
 * SectionDivider
 * Displays a divider line between section
 * @param {object} props
 * @param {object} props.dayNum - Day number of the section
 * @param {object} props.sectionRefs - Ref Object containing an element ref of each section
 * @param {object} props.styles - Custom styles for the Divider component
 */
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
 * Helper hook to allow scrolling to a section when a day change happends
 * @param {Object} currentDay - The current day of sessions being shown
 * @param {function} onDayChange - Callback method to be called when the day is changed
 * @param {Object} listRef - React ref of the SectionList component
 * @param {Object} sectionRefs - React ref of all Section divider components.
 *
 * @returns {function} - Method to call when the current day is changed
 */
const useOnDayChange = (currentDay, onDayChange, listRef, sectionRefs) => {
  return useCallback(
    changeToDay => {
      const element = sectionRefs.current[changeToDay]

      element.measure((...args) =>
        scrollList({
          listRef,
          // Add an offset because of our sticky header
          offset: sectionOffset,
          // Get the layout data for the element
          layout: normalizeLayout(...args),
        })
      )

      // Call the passed in onDayChange if it exists
      checkCall(onDayChange, changeToDay)
    },
    [
      currentDay,
      onDayChange,
      listRef && listRef.current,
      sectionRefs && sectionRefs.current && sectionRefs.current[currentDay],
    ]
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

  const listRef = useRef(null)
  const sectionRefs = useRef({})

  const onChangeDays = useOnDayChange(
    currentDay,
    onDayChange,
    listRef,
    sectionRefs
  )

  const onSectionChange = useCallback(
    sectionIndex => {
      const switchSection = sections[sectionIndex]
      if (!switchSection) return

      const { dayNum } = sections[sectionIndex]
      const switchToDay = parseInt(dayNum)

      switchToDay < currentDay
        ? decrementDay()
        : switchToDay > currentDay && incrementDay()
    },
    [ currentDay, sections ]
  )

  return (
    <SectionList
      ref={listRef}
      styles={styles}
      sections={sections}
      onSectionChange={onSectionChange}
      sectionChangeOffset={sectionOffset}
      renderListHeader={() => (
        <SessionsHeader
          currentDay={currentDay}
          labels={itemProps.labels}
          onDayChange={onChangeDays}
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
