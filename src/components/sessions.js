import React, { useEffect, useCallback } from 'react'
import { useTheme } from '@svkeg/re-theme'
import { mapSessionInterface } from 'SVActions/session/mapSessionInterface'
import { incrementDay, decrementDay } from 'SVActions/session/dates'
import { RenderModals } from 'SVComponents/modal/renderModals'
import { GridContainer } from 'SVContainers/gridContainer'
import { useSelector, shallowEqual } from 'react-redux'
import { useAgenda } from 'SVHooks/models/useAgenda'
import { View } from '@svkeg/keg-components'
import { DayToggle } from 'SVComponents/dates/dayToggle'
import { noOp } from 'SVUtils/helpers/method/noop'
import { pickKeys, mapObj, get } from '@svkeg/jsutils'

/**
 * FilterButton
 * Renders either an Icon or a text button based on current screen dimension
 * @param {object} props
 * @param {object} props.styles
 * @param {Function} props.onClick
 */
const FilterButton = ({ onClick, styles }) => {
  const dim = useDimensions()
  console.log(dim.width)
  return dim.width <= 620 ? null : (
    // <EVFIcon.Filter
    //   style={styles.filterIcon}
    //   // dataSet={BaseModal.dataSet.content.header.content.closeButton}
    //   onPress={onClick}
    //   color={styles.filterIcon.color}
    // />
    <Button
      themePath='button.text.default'
      styles={styles.filterButton}
      onClick={onClick}
      content={'Filter'}
    />
  )
}

/**
 * Component that will hold the day toggle and filter button
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
    <View
      style={styles.content?.header?.main}
      dataSet={Sessions.dataSet.content.header}
    >
      <AppHeader
        dataSet={Sessions.dataSet.content.header}
        styles={{ main: headerStyles.main }}
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
            onClick={() => console.log('press')}
          />
        }
      />
    </View>
  )
}

/**
 * SessionComponent
 * @param {Object} props
 * @param {import('SVModels/sessionAgendaProps').SessionAgendaProps} props.sessionData - session agenda props defined in evf interface
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 */
export const Sessions = props => {
  const { onDayChange = noOp, sessionData } = props

  useEffect(() => void mapSessionInterface(sessionData), [])

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
      {
        // creates a gridContainer separated by hour blocks
        mapObj(
          agendaSessions[settings?.agendaSettings?.activeDayNumber || 1],
          (key, sessions) => {
            return (
              <GridContainer
                key={key}
                sessions={sessions}
                labels={labels}
                timeBlock={key}
              />
            )
          }
        )
      }
      { modals.length > 0 && RenderModals(modals) }
    </View>
  )
}

Sessions.dataSet = {
  main: { class: 'sessions-main' },
  content: {
    header: { class: 'sessions-content-header' },
  },
}
