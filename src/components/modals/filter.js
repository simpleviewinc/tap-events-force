import React, { useMemo, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { View, Text, ScrollView } from '@old-keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { sortLabels } from 'SVUtils'
import { LabelButton } from 'SVComponents/labels/labelButton'
import { Label } from 'SVModels/label'
import { Values } from 'SVConstants/values'
import { reduceObj, wordCaps, filterObj, noPropArr } from '@keg-hub/jsutils'
import {
  updateSelectedFilters,
  applySessionFilters,
  cancelSelectedFilters,
  clearSelectedFilters,
} from 'SVActions/session/filters'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import {
  useFilteredSessions,
  useWaitingListActive,
  useAllowBooking,
} from 'SVHooks/sessions'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'

const { SESSION_BOOKING_STATES, CATEGORIES, BUTTON_TYPES } = Values

/**
 *
 * @param {object} props
 */
export const Filter = ({ visible, labels }) => {
  const theme = useTheme()
  const filterStyles = theme.get('modal.filter')

  // sort the labels alphabetically
  const labelsMemo = useMemo(() => sortLabels(labels), [labels])
  const applyCb = useCallback(() => {
    applySessionFilters()
    hideActiveModal()
  }, [ applySessionFilters, hideActiveModal ])

  const { filters } = useStoreItems([CATEGORIES.FILTERS])
  const hasSelectedFilters = Boolean(filters?.selectedFilters.length)
  const filteredSessions = useFilteredSessions()

  return (
    <BaseModal
      onDismiss={cancelSelectedFilters}
      visible={visible}
      Body={
        <Body
          styles={filterStyles?.content?.body}
          labels={labelsMemo}
          selectedFilters={filters?.selectedFilters}
          hideCounter={!hasSelectedFilters}
          filteredSessions={filteredSessions}
        />
      }
      Footer={
        <Footer
          disableApply={hasSelectedFilters && filteredSessions?.length === 0}
          styles={filterStyles?.content?.footer}
          onButtonPress={applyCb}
          hasSelectedFilters={hasSelectedFilters}
        />
      }
    />
  )
}

/**
 *
 * @param {object} props
 * @param {object} props.styles - default from modal.filter.body.topSection
 * @param {Array.<import('SVModels/session').Session>} props.filteredSessions
 * @param {Boolean} props.hideCounter
 */
const TopSection = ({ styles, filteredSessions, hideCounter = false }) => {
  return (
    <View style={styles?.main}>
      <Text
        style={styles?.leftText}
        className={'ef-modal-body-header'}
      >
        Only Show:
      </Text>
      <ResultsCounter
        hide={hideCounter}
        count={filteredSessions.length}
        styles={styles}
      />
    </View>
  )
}

/**
 * ResultsCounter
 * displays the count of filter
 * @param {object} props
 * @param {object} props.styles
 * @param {object} props.hide - whether to show/hide this component
 * @param {Number=} props.count
 */
const ResultsCounter = ({ styles, hide, count = 0 }) => {
  const resultText = `${count} ${
    count > 1 || count === 0 ? 'results' : 'result'
  }`
  return hide ? null : (
    <Text
      style={styles?.resultsText}
      className={'ef-modal-body-highlight'}
    >
      { resultText }
    </Text>
  )
}

/**
 * Checks whether or not a particular label should be on the 'toggled on' state or not
 * @param {number} selectedCount
 * @param {Array.<import('SVModels/label').Label>} selectedFilters
 * @param {import('SVModels/label').Label} label
 *
 * @returns {boolean}
 */
const useLabelOn = (selectedCount, selectedFilters, label) => {
  // Check selectedCount before doing the loop. If none are selected, we save a few cpu cycles
  return useMemo(() => {
    return (
      selectedCount &&
      selectedFilters.some(item => item.identifier === label.identifier)
    )
  }, [ selectedFilters, selectedCount, label ])
}

/**
 * FilterLabelButton - Renders the label button component for a label object
 * Calls hook useLabelOn to check if the label is active of not
 * @param {Object} props
 * @param {Object} props.styles - styles to be applied to LabelButton
 * @param {import('SVModels/label').Label} props.label - the label model instance
 * @param {Array.<import('SVModels/label').Label>} props.selectedFilters - current selected filters
 * @param {number} selectedFilters - Total number of selected filters
 */
const FilterLabelButton = props => {
  const { label, styles, selectedCount, selectedFilters } = props

  const isLabelOn = useLabelOn(selectedCount, selectedFilters, label)

  return (
    <LabelButton
      label={label}
      styles={styles}
      toggledOn={!selectedCount || isLabelOn}
      onPress={updateSelectedFilters}
    />
  )
}

/**
 * LabelButtons
 * Builds the filter items
 * Expected behavior:
 *   - All filters are 'toggled on' by default when no filter is selected
 *   - Once a filter item is selected, all are toggled off except for the selected item(s)
 * @param {object} props
 * @param {object} props.styles - styles to be applied to LabelButton
 * @param {Array.<import('SVModels/label').Label>} props.labels - array of label items
 * @param {Array.<import('SVModels/label').Label>} props.selectedFilters - current selected filters
 */
const LabelButtons = React.memo(
  ({ styles, labels, selectedFilters = noPropArr }) => {
    const selectedCount = selectedFilters.length
    return labels.map(label => {
      return (
        <FilterLabelButton
          key={label.name}
          label={label}
          styles={styles}
          selectedFilters={selectedFilters}
          selectedCount={selectedCount}
        />
      )
    })
  }
)

/**
 * Creates an array of Labels based on the passed in object
 * @param {object} bookingStates - obj of the form
 *                               - {
 *                                   keyName: string,
 *                                   ...etc
 *                                 }
 * @returns {Array.<import('SVModels/label').Label>}
 */
const useStateLabels = bookingStates => {
  const waitingListActive = useWaitingListActive()
  const allowBooking = useAllowBooking()

  return useMemo(() => {
    const {
      WAITING_LIST,
      ON_WAITING_LIST,
      SELECT,
      SELECTED,
    } = SESSION_BOOKING_STATES

    return reduceObj(
      bookingStates,
      (key, value, labels) => {
        //If any session allows waiting lists, enable the two related waiting list labels
        const waitingListFilters =
          waitingListActive &&
          (value == WAITING_LIST || value == ON_WAITING_LIST)
        //If any session allows bookings, enable the two related allow booking labels
        const allowBookingFilters =
          allowBooking && (value == SELECT || value == SELECTED)

        ;(waitingListFilters || allowBookingFilters) &&
          labels.push(new Label({ name: wordCaps(value), identifier: key }))

        return labels
      },
      []
    )
  }, [ bookingStates, waitingListActive, allowBooking ])
}

const filteredBookingStates = filterObj(
  SESSION_BOOKING_STATES,
  (_, val) =>
    val != SESSION_BOOKING_STATES.FULLY_BOOKED &&
    val != SESSION_BOOKING_STATES.READ_ONLY
)
/**
 * MiddleSection
 * @param {object} props
 * @param {object} props.styles - default from modal.filter.body.middleSection
 * @param {Array.<import('SVModels/label').Label>} props.labels - array of label items
 * @param {Array.<import('SVModels/label').Label>} props.selectedFilters - current selected filters
 */
const MiddleSection = ({ styles, labels, selectedFilters }) => {
  const stateLabels = useStateLabels(filteredBookingStates)

  return (
    <ScrollView
      style={styles?.main}
      contentContainerStyle={styles?.container}
    >
      <View style={styles?.labelButtons?.main}>
        <LabelButtons
          styles={styles.labelButtons?.item}
          labels={labels}
          selectedFilters={selectedFilters}
        />
      </View>

      <View style={styles?.stateButtons?.main}>
        <LabelButtons
          styles={styles?.stateButtons?.item}
          labels={stateLabels}
          selectedFilters={selectedFilters}
        />
      </View>
    </ScrollView>
  )
}

/**
 * Body
 * @param {object} props
 * @param {object} props.styles
 * @param {Array.<import('SVModels/label').Label>} props.labels - labels to display
 * @param {Array.<import('SVModels/session').Session>} props.filteredSessions
 * @param {Array.<import('SVModels/label').Label>} props.selectedFilters
 * @param {Boolean} props.hideCounter - to hide the results counter or not
 */
const Body = ({
  styles,
  labels,
  filteredSessions,
  selectedFilters,
  hideCounter,
}) => {
  return (
    <View style={styles?.main}>
      <TopSection
        styles={styles?.topSection}
        filteredSessions={filteredSessions}
        hideCounter={hideCounter}
      />
      <MiddleSection
        labels={labels}
        styles={styles?.middleSection}
        selectedFilters={selectedFilters}
      />
    </View>
  )
}

/**
 * Footer
 * @param {object} props
 * @param {object} props.styles - default from modal.filter.body.bottomSection theme
 * @param {Function} props.onButtonPress
 * @param {boolean} props.hasSelectedFilters - whether or not the selectedFilters state is empty
 * @param {boolean} props.disableApply - whether the apply btn is disabled or not
 */
const Footer = ({
  styles,
  onButtonPress,
  hasSelectedFilters,
  disableApply,
}) => {
  return (
    <View style={styles?.main}>
      { hasSelectedFilters && (
        <EvfButton
          buttonType={BUTTON_TYPES.LINK}
          styles={styles?.clearButton}
          onClick={clearSelectedFilters}
          text={'Clear all'}
        />
      ) }
      <EvfButton
        buttonType={BUTTON_TYPES.MODAL_PRIMARY}
        disabled={disableApply}
        type={'primary'}
        styles={styles?.applyButton}
        onClick={onButtonPress}
        text={'APPLY'}
      />
    </View>
  )
}
