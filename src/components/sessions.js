import React, { useEffect, useCallback, useMemo } from 'react'
import { useTheme, useDimensions, useStylesCallback } from '@keg-hub/re-theme'
import { View, ItemHeader, Button, ScrollView } from '@keg-hub/keg-components'
import { RenderModals } from 'SVComponents/modals/renderModals'
import { mapSessionInterface } from 'SVActions/session/mapSessionInterface'
import {
  applySessionFilters,
  clearSelectedFilters,
} from 'SVActions/session/filters'
import { incrementDay, decrementDay } from 'SVActions/session/dates'
import { handleAttendeeRequest } from 'SVActions/session/booking/handleAttendeeRequest'
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

const { EVENTS, CATEGORIES, SUB_CATEGORIES } = Values
const { SESSION_BOOKING_REQUEST } = EVENTS

/**
 * FilterButton
 * Renders either an Icon or a text button based on current screen dimension
 * @param {object} props
 * @param {object} props.styles
 * @param {Function} props.onClick
 * @param {boolean} props.showIcon
 */
const FilterButton = ({ onClick, styles, showIcon }) => {
  return showIcon ? (
    <View
      className={'ef-sessions-filter-button'}
      style={styles?.filterIcon?.main}
    >
      <EVFIcons.Filter
        className={'ef-sessions-filter-button'}
        style={styles?.filterIcon?.icon}
        onPress={onClick}
        color={styles?.filterIcon?.icon?.color}
      />
    </View>
  ) : (
    <Button
      className={'ef-sessions-filter-button'}
      themePath='button.text.default'
      styles={styles?.filterButton}
      onClick={onClick}
      content={'Filter'}
    />
  )
}

/**
 * Builds the styles for the header right component
 * @param {Object} theme - Global Theme object
 * @param {Object} custom - contains {styles, smallWidth}
 *
 * @returns {Object}
 */
const buildStylesHeaderRight = (theme, custom) => {
  return theme.get(
    custom.styles,
    custom.smallWidth && {
      main: {
        paddingRight: 0,
      },
    }
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
        <ItemHeaderRight
          styles={headerStyles?.content?.right?.content}
          onClick={displayFilterModal}
        />
      }
    />
  )
}

/**
 * ItemHeaderRight
 * displays the filter btn and clear btn
 *    hides the clear btn when dimension is small enough
 * @param {object} props
 * @param {object} props.styles - theme path: header.content.right.content
 */
const ItemHeaderRight = ({ styles, onClick }) => {
  const dim = useDimensions()
  const activeFilters = useStoreItems(
    `${CATEGORIES.FILTERS}.${SUB_CATEGORIES.ACTIVE_FILTERS}`
  )

  const smallWidth = dim.width <= 720
  const showClearButton = dim.width > 520 && Boolean(activeFilters?.length)

  const customStyles = useMemo(
    () => ({
      smallWidth,
      styles,
    }),
    [ styles, smallWidth ]
  )

  const mainStyle = useStylesCallback(
    buildStylesHeaderRight,
    [ styles, smallWidth ],
    customStyles
  )
  const clearActiveFilters = useCallback(() => {
    clearSelectedFilters()
    applySessionFilters()
  }, [ applySessionFilters, clearSelectedFilters ])

  return (
    <View style={mainStyle?.main}>
      <FilterButton
        styles={mainStyle}
        onClick={onClick}
        showIcon={smallWidth}
      />
      { showClearButton && (
        <Button
          themePath='button.text.default'
          styles={mainStyle?.clearAll}
          content={'Clear'}
          onClick={clearActiveFilters}
        />
      ) }
    </View>
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
 * Registers the request callback to the session booking request event, but
 * first wraps the callbacks to handle setting the associated session to pending,
 * resetting that status upon resolving the promise, and catching
 * any errors that might arise so to display the alert modal.
 * @param {Function<Promise>} bookRequestCb - an async function for booked-list request
 * @param {Function<Promise>} waitRequestCb - an async function for wait-list request
 * @return {void}
 */
const useAttendeeRequestEvent = (bookRequestCb, waitRequestCb) => {
  const handler = useCallback(
    (...args) => handleAttendeeRequest(bookRequestCb, waitRequestCb, ...args),
    [ bookRequestCb, waitRequestCb ]
  )

  useKegEvent(SESSION_BOOKING_REQUEST, handler)
}

/**
 * SessionComponent
 * @param {Object} props
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props.sessionAgendaProps - session agenda props defined in evf interface
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 * @param {Function} props.onSessionBookingRequest - callback for session booking
 * @param {Function} props.onSessionWaitingListRequest - callback for session wait list booking
 */
export const Sessions = props => {
  const {
    onDayChange = noOp,
    sessionAgendaProps,
    onSessionBookingRequest = noOp,
    onSessionWaitingListRequest = noOp,
  } = props

  // set up our event listener for booking and waiting list requests
  useAttendeeRequestEvent(onSessionBookingRequest, onSessionWaitingListRequest)

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
      { RenderModals(modals) }
    </View>
  )
}
