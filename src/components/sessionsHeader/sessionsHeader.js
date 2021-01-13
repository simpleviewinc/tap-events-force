import { EVFIcons } from 'SVIcons'
import { Values } from 'SVConstants'
import { format, parseISO } from 'date-fns'
import { useCreateModal } from 'SVHooks/modal'
import React, { useCallback, useMemo } from 'react'
import { useAgenda } from 'SVHooks/models/useAgenda'
import { DayToggle } from 'SVComponents/dates/dayToggle'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { ItemHeader, Button, View } from '@keg-hub/keg-components'
import { incrementDay, decrementDay } from 'SVActions/session/dates'
import { useTheme, useDimensions, useStylesCallback } from '@keg-hub/re-theme'
import {
  applySessionFilters,
  clearSelectedFilters,
} from 'SVActions/session/filters'

const { CATEGORIES, MODAL_TYPES, SUB_CATEGORIES } = Values

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
 * Component that will hold the day toggle and filter button
 * @param {object} props
 * @param {object} props.styles - styles obj
 * @param {Array<import('SVModels/label').Label>} props.labels - session labels
 * @param {Function} props.onDayChange - function for handling day changes in the day toggle
 */
export const SessionsHeader = React.memo(({ agenda, currentDay, dayText, onDayChange, labels }) => {
  const { currentAgendaDay, agendaLength, isLatestDay, isFirstDay } = agenda
  const theme = useTheme()
  const styles = theme.get('sessions')

  const increment = useCallback(() => incrementDay(onDayChange), [onDayChange])
  const decrement = useCallback(() => decrementDay(onDayChange), [onDayChange])
  const headerStyles = styles.content?.header
  const displayFilterModal = useCreateModal(MODAL_TYPES.FILTER, { labels })

  return (
    <View style={headerStyles?.container}>
      <ItemHeader
        styles={headerStyles}
        CenterComponent={
          <DayToggle
            dayText={dayText}
            dayNumber={currentDay}
            disableDecrement={isFirstDay}
            disableIncrement={isLatestDay || !agendaLength}
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
    </View>
  )
})
