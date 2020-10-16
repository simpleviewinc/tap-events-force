import React, { useEffect, useCallback, useMemo } from 'react'
import { useTheme, useDimensions } from '@keg-hub/re-theme'
import { View, ItemHeader, Button, ScrollView } from '@keg-hub/keg-components'
import { RenderModals } from 'SVComponents/modals/renderModals'
import { mapSessionInterface } from 'SVActions/session/mapSessionInterface'
import { applySessionFilters } from 'SVActions/session/filters/applySessionFilters'
import { incrementDay, decrementDay } from 'SVActions/session/dates'
import { GridContainer } from 'SVContainers/gridContainer'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useAgenda } from 'SVHooks/models/useAgenda'
import { useParsedStyle } from 'SVHooks/useParsedStyle'
import { DayToggle } from 'SVComponents/dates/dayToggle'
import { noOp } from 'SVUtils/helpers/method/noop'
import { get } from '@keg-hub/jsutils'
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
          styles={headerStyles?.content?.right}
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
 * @param {Array} props.daySessions - group of sessions by block. see buildHourSessionsMap helper
 * @param {boolean} props.enableFreeLabel - whether to display 'FREE' on session with no pricing or not
 * @param {boolean} props.militaryTime - whether to display time in 12 hr or 24 hr format
 * @returns {Component}
 */
const AgendaSessions = React.memo(
  ({ labels, daySessions, enableFreeLabel, militaryTime }) => {
    if (!daySessions) return null

    return (
      <ScrollView>
        { daySessions.map(daySession => {
          return (
            // creates a gridContainer separated by hour blocks
            <GridContainer
              key={daySession?.timeBlock}
              sessions={daySession?.sessions}
              labels={labels}
              timeBlock={daySession?.timeBlock}
              enableFreeLabel={enableFreeLabel}
              militaryTime={militaryTime}
            />
          )
        }) }
      </ScrollView>
    )
  }
)

/**
 * SessionComponent
 * @param {Object} props
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props.sessionAgendaProps - session agenda props defined in evf interface
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 * @param {Function} props.onSessionBookingRequest - callback for session booking
 */
export const Sessions = props => {
  const {
    onDayChange = noOp,
    sessionAgendaProps,
    onSessionBookingRequest = noOp,
    onSessionWaitingListRequest = noOp,
  } = props

  // set up our event listener for booking and waiting list requests
  useKegEvent(EVENTS.SESSION_BOOKING_REQUEST, onSessionBookingRequest)
  useKegEvent(EVENTS.SESSION_WAITING_LIST_REQUEST, onSessionWaitingListRequest)

  useEffect(() => {
    mapSessionInterface(sessionAgendaProps)
    applySessionFilters()
  }, [sessionAgendaProps])

  const theme = useTheme()
  const sessionsStyles = theme.get('sessions')

  const { labels, agendaSessions, modals, settings, sessions } = useStoreItems([
    'labels',
    'agendaSessions',
    'modals',
    'settings',
    'sessions',
  ])

  // - if no session item contains price info. don't display any price label
  // - if some session items do have price. the one's that do not, need to have 'free' label
  const enableFreeLabel = useMemo(() => {
    return sessions.some(session => session.price?.amount > 0)
  }, [sessions])

  const parsedStyle = useParsedStyle('ef-sessions-background')

  return (
    <View
      className={'ef-sessions-background'}
      style={[ sessionsStyles.main, parsedStyle ]}
    >
      <SessionsHeader
        labels={labels}
        styles={sessionsStyles}
        onDayChange={onDayChange}
      />
      <AgendaSessions
        labels={labels}
        enableFreeLabel={enableFreeLabel}
        daySessions={
          agendaSessions[settings?.agendaSettings?.activeDayNumber ?? 1]
        }
        militaryTime={settings?.displayProperties?.timeFormat === '24'}
      />
      { modals.length > 0 && RenderModals(modals) }
    </View>
  )
}
