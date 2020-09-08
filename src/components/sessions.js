import React, { useEffect, useCallback } from 'react'
import { useTheme, useDimensions } from '@keg-hub/re-theme'
import { View, ItemHeader, Button } from '@keg-hub/keg-components'
import { RenderModals } from 'SVComponents/modal/renderModals'
import { mapSessionInterface } from 'SVActions/session/mapSessionInterface'
import { incrementDay, decrementDay } from 'SVActions/session/dates'
import { GridContainer } from 'SVContainers/gridContainer'
import { useSelector, shallowEqual } from 'react-redux'
import { useAgenda } from 'SVHooks/models/useAgenda'
import { DayToggle } from 'SVComponents/dates/dayToggle'
import { noOp } from 'SVUtils/helpers/method/noop'
import { pickKeys, mapObj, get } from '@keg-hub/jsutils'
import { EVFIcons } from 'SVIcons'
import { Values } from 'SVConstants'
import { useKegEvent } from 'SVHooks/events'

const { EVENTS } = Values
/**
 * FilterButton
 * Renders either an Icon or a text button based on current screen dimension
 * @param {object} props
 * @param {object} props.styles
 * @param {Function} props.onClick
 * @param {object} props.dataSet
 */
const FilterButton = ({ onClick, styles, dataSet }) => {
  const dim = useDimensions()

  const contentStyles = styles?.content

  // use filter icon when below 650px width
  return dim.width <= 650 ? (
    <EVFIcons.Filter
      style={contentStyles?.filterIcon}
      dataSet={dataSet?.content?.filterIcon}
      onPress={onClick}
      color={contentStyles?.filterIcon?.color}
    />
  ) : (
    <Button
      themePath='button.text.default'
      dataSet={dataSet?.content?.filterButton}
      styles={contentStyles?.filterButton}
      onClick={onClick}
      content={'Filter'}
    />
  )
}

/**
 * Component that will hold the day toggle and filter button
 * @param {object} props
 * @param {object} props.styles - styles obj
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 */
const SessionsHeader = ({ styles, onDayChange }) => {
  const {
    currentAgendaDay = {},
    currentDayNumber,
    isLatestDay,
    isFirstDay,
  } = useAgenda()

  const increment = useCallback(() => incrementDay(onDayChange), [onDayChange])
  const decrement = useCallback(() => decrementDay(onDayChange), [onDayChange])
  const headerStyles = styles.content?.header

  return (
    <ItemHeader
      dataSet={Sessions.dataSet.content.header}
      styles={headerStyles}
      CenterComponent={
        <DayToggle
          date={get(currentAgendaDay, 'date')}
          dayNumber={currentDayNumber}
          disableDecrement={isFirstDay}
          disableIncrement={isLatestDay}
          onDecrement={decrement}
          onIncrement={increment}
        />
      }
      RightComponent={
        <FilterButton
          dataSet={Sessions.dataSet.content.header.content.right}
          styles={headerStyles.content?.right}
          onClick={() => console.log('press')}
        />
      }
    />
  )
}

/**
 * Sets up the container for a group of sessions on a specific day
 * @param {object} props
 * @param {object} props.labels
 * @param {object} props.daySessions - group of sessions in the form of {'9:15': [sessionA, sessionB,..]}
 * @returns {Component}
 */
const AgendaSessions = React.memo(({ labels, daySessions }) => {
  if (!daySessions) return null

  return mapObj(daySessions, (timeBlock, sessions) => {
    return (
      // creates a gridContainer separated by hour blocks
      <GridContainer
        key={timeBlock}
        sessions={sessions}
        labels={labels}
        timeBlock={timeBlock}
      />
    )
  })
})

const kegEventEmitter = getEventEmitter()
/**
 * SessionComponent
 * @param {Object} props
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props.sessionData - session agenda props defined in evf interface
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 * @param {Function} props.onSessionBookingRequest - callback for session booking
 */
export const Sessions = props => {
  const { onDayChange = noOp, sessionData, onSessionBookingRequest } = props

  // set up our ev ent listener for booking request
  useKegEvent(EVENTS.SESSION_BOOKING_REQUEST, onSessionBookingRequest)

  useEffect(() => {
    mapSessionInterface(sessionData)
  }, [])

  const theme = useTheme()
  const sessionsStyles = theme.get('sessions')

  const { labels, agendaSessions, modals, settings } = useSelector(
    ({ items }) =>
      pickKeys(items, [ 'labels', 'agendaSessions', 'modals', 'settings' ]),
    shallowEqual
  )

  return (
    <View
      dataSet={Sessions.dataSet.main}
      style={sessionsStyles.main}
    >
      <SessionsHeader
        styles={sessionsStyles}
        onDayChange={onDayChange}
      />
      <AgendaSessions
        labels={labels}
        daySessions={
          agendaSessions[settings?.agendaSettings?.activeDayNumber ?? 1]
        }
      />
      { modals.length > 0 && RenderModals(modals) }
    </View>
  )
}

Sessions.dataSet = {
  main: { class: 'sessions-main' },
  content: {
    header: {
      main: { class: 'sessions-content-header-main' },
      content: {
        right: {
          content: {
            filterIcon: {
              class: 'sessions-content-header-content-right-filter-icon',
            },
            filterButton: {
              class: 'sessions-content-header-content-right-filter-button',
            },
          },
        },
      },
    },
  },
}
