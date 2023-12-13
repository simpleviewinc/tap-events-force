import { getStore } from 'SVStore'
import React, { useMemo, useContext, useCallback } from 'react'
import { EVFIcons } from 'SVIcons'
import { reduceObj, noPropArr } from '@keg-hub/jsutils'
import { useAgenda } from 'SVHooks/models/useAgenda'
import { GridContainer } from 'SVContainers/gridContainer'
import { ComponentsContext } from '../../contexts/components/componentsContext'
import { useWaitingListActive, useAllowBooking } from 'SVHooks/sessions'
import { useCreateModal } from 'SVHooks/modal'
import { Button } from '@old-keg-hub/keg-components'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import { useDimensions } from '@keg-hub/re-theme'
import { Values } from 'SVConstants'
import {
  applySessionFilters,
  clearSelectedFilters,
} from 'SVActions/session/filters'

const { CATEGORIES, MODAL_TYPES, SUB_CATEGORIES } = Values

/**
 * Hook to memoize the sessions for a day, and add a key
 * @param {Object} agendaSessions - mapping of session timeblocks by day, e.g. { '1': [ <...SessionTimeBlock> ], '2': [ <...SessionTimeBlcok> ] }, where keys are day numbers
 *  - each time block is of form: { timeBlock: '9:00AM', sessions: [ <array of sessions in this time block> ]}
 * @param {Array} agendaDays - days of the agenda
 *
 * @returns {Array} - memoized sessions in SectionList required format
 */
const useSessionsSections = (agendaSessions, agendaDays = noPropArr) => {
  return useMemo(() => {
    return reduceObj(
      agendaSessions,
      (dayNum, timeBlocks, sections) => {
        sections.push({
          dayNum,
          // Is the first section if no sections have been added
          first: !sections.length,
          // Is the last section, if total sections === total sessions minus one
          last: Object.keys(agendaSessions).length - 1 === sections.length,
          // Store the text to displace above each day
          dayText: agendaDays.find(
            agendaDay => agendaDay.dayNumber === parseInt(dayNum)
          )?.dayName,
          data: timeBlocks.map(timeBlock => {
            timeBlock.key = `${dayNum}-${timeBlock.timeBlock}`
            return timeBlock
          }),
        })

        return sections
      },
      []
    )
  }, [ agendaSessions, agendaDays ])
}

const HeaderButtons = ({ onClick }) => {
  const dim = useDimensions()
  const activeFilters = useStoreItems(
    `${CATEGORIES.FILTERS}.${SUB_CATEGORIES.ACTIVE_FILTERS}`
  )
  const activePresenterFilters = useStoreItems(
    `${CATEGORIES.FILTERS}.${SUB_CATEGORIES.ACTIVE_PRESENTER_FILTERS}`
  )

  const smallWidth = dim.width <= 768
  const showClearButton =
    dim.width > 576 &&
    (Boolean(activeFilters?.length) || Boolean(activePresenterFilters?.length))

  const clearActiveFilters = useCallback(() => {
    clearSelectedFilters()
    applySessionFilters()
  }, [ applySessionFilters, clearSelectedFilters ])

  const filterButtonClassName = 'ef-sessions-filter-button col-auto'

  return (
    <div className='row justify-content-end pr-md-5 pr-sm-3'>
      { smallWidth ? (
        <div className={filterButtonClassName + ' align-self-center px-0'}>
          <EVFIcons.Filter
            onPress={onClick}
            color={'#000000'}
          />
        </div>
      ) : (
        <Button
          className={filterButtonClassName}
          onClick={onClick}
          content={'Edit Filter'}
        />
      ) }
      { showClearButton && (
        <Button
          content={'Clear'}
          onClick={clearActiveFilters}
          className='col-auto ef-sessions-clear-filters-button'
        />
      ) }
    </div>
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
  const {
    settings,
    sessions,
    onDayChange,
    showPresenterDetailsModal,
    labels,
    ...itemProps
  } = props

  const agenda = useAgenda()
  const days = useSessionsSections(sessions, agenda?.agendaDays)

  const waitingListActive = useWaitingListActive()
  const allowBooking = useAllowBooking()
  const areCustomFilterLabelsPresent = labels?.length > 0

  const displayFilterModal = useCreateModal(MODAL_TYPES.FILTER, { labels })

  const { AgendaLayoutRenderer, shouldShowPresenterFilter } = useContext(
    ComponentsContext
  )

  const { items } = getStore()?.getState()
  const selectedFilters = items?.filters?.selectedFilters || []
  const selectedPresenterFilters =
    items?.filters?.selectedPresenterFilters || []

  return (
    <AgendaLayoutRenderer
      days={days}
      selectedFilters={selectedFilters}
      selectedPresenterFilters={selectedPresenterFilters}
      renderDayTimeBlock={timeBlock => {
        return (
          <GridContainer
            key={timeBlock.key}
            showPresenterDetailsModal={showPresenterDetailsModal}
            labels={labels}
            {...timeBlock}
            {...itemProps}
          />
        )
      }}
      renderHeaderButtons={() => {
        return (
          (waitingListActive ||
            allowBooking ||
            areCustomFilterLabelsPresent ||
            shouldShowPresenterFilter) && (
            <HeaderButtons onClick={displayFilterModal} />
          )
        )
      }}
    />
  )
}
