import React, { useEffect, useCallback } from 'react'
import { useTheme, useDimensions } from '@keg-hub/re-theme'
import { View, ItemHeader, Button } from '@keg-hub/keg-components'
import { RenderModals } from 'SVComponents/modals/renderModals'
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
import { useCreateModal } from 'SVHooks/modal'

const { EVENTS } = Values
/**
 * FilterButton
 * Renders either an Icon or a text button based on current screen dimension
 * @param {object} props
 * @param {object} props.styles
 * @param {Function} props.onClick
 */
const FilterButton = ({ onClick, styles }) => {
  const dim = useDimensions()

  const contentStyles = styles?.content

  // use filter icon when below 650px width
  return dim.width <= 650 ? (
    <View className={'ef-sessions-filter-button'}>
      <EVFIcons.Filter
        className={'ef-sessions-filter-button'}
        style={contentStyles?.filterIcon}
        onPress={onClick}
        color={contentStyles?.filterIcon?.color}
      />
    </View>
  ) : (
    <Button
      className={'ef-sessions-filter-button'}
      themePath='button.text.default'
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
 * @param {Array<import('SVModels/label').Label>} props.labels - session labels
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 */
const SessionsHeader = ({ styles, onDayChange, labels }) => {
  const {
    currentAgendaDay = {},
    currentDayNumber,
    isLatestDay,
    isFirstDay,
  } = useAgenda()

  const increment = useCallback(() => incrementDay(onDayChange), [onDayChange])
  const decrement = useCallback(() => decrementDay(onDayChange), [onDayChange])
  const headerStyles = styles.content?.header
  const displayFilterModal = useCreateModal(Values.MODAL_TYPES.FILTER, {
    labels,
  })

  return (
    <ItemHeader
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
          styles={headerStyles.content?.right}
          onClick={displayFilterModal}
        />
      }
    />
  )
}

/**
 * Sets up the container for a group of sessions on a specific day
 * @param {object} props
 * @param {Array<import('SVModels/label').Label>} props.labels - session labels
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
      className={'ef-sessions-background'}
      style={sessionsStyles.main}
    >
      <SessionsHeader
        labels={labels}
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
