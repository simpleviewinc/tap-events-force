import React, { useRef, useMemo, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { View, Text, ScrollView, Button } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { sortLabels } from 'SVUtils'
import { LabelButton } from 'SVComponents/labels/labelButton'
import { Label } from 'SVModels/label'
import { Values } from 'SVConstants/values'
import {
  reduceObj,
  wordCaps,
  checkCall,
  filterObj,
  noPropArr,
} from '@keg-hub/jsutils'
import {
  updateSelectedFilters,
  applySessionFilters,
  cancelSelectedFilters,
  clearSelectedFilters,
} from 'SVActions/session/filters'
import { useStoreItems } from 'SVHooks/store/useStoreItems'
import {
  sessionsFromLabelFilters,
  sessionsFromStateFilters,
} from 'SVUtils/filters'

const { SESSION_BOOKING_STATES, CATEGORIES } = Values

/**
 *
 * @param {object} props
 */
export const Filter = ({ visible, labels }) => {
  const theme = useTheme()
  const filterStyles = theme.get('modal.filter')
  const dismissedCBRef = useRef()
  // sort the labels alphabetically
  const labelsMemo = useMemo(() => sortLabels(labels), [labels])
  const applyCb = useCallback(() => {
    applySessionFilters()
    checkCall(dismissedCBRef.current, true)
  }, [ applySessionFilters, dismissedCBRef?.current ])

  return (
    <BaseModal
      dismissedCBRef={dismissedCBRef}
      styles={filterStyles}
      title={'Filter'}
      visible={visible}
      onDismiss={cancelSelectedFilters}
    >
      <Content
        styles={filterStyles?.content?.body}
        labels={labelsMemo}
        onButtonPress={applyCb}
      />
    </BaseModal>
  )
}

/**
 * Content of filter modal
 * @param {object} props
 * @param {object} props.styles
 * @param {Function} props.onButtonPress
 * @param {Array<import('SVModels/label').Label>} props.labels
 */
const Content = ({ styles, onButtonPress, labels }) => {
  const { filters, sessions } = useStoreItems([
    CATEGORIES.FILTERS,
    CATEGORIES.SESSIONS,
  ])
  const hasSelectedFilters = Boolean(filters?.selectedFilters.length)

  // do basic filtering on SELECTED labels so we can get the count
  const filteredSessions =
    hasSelectedFilters &&
    sessionsFromLabelFilters(
      filters?.selectedFilters,
      sessionsFromStateFilters(filters?.selectedFilters, sessions)
    )

  return (
    <View style={styles?.main}>
      <TopSection
        styles={styles?.topSection}
        filteredSessions={filteredSessions || []}
        hideCounter={!hasSelectedFilters}
      />
      <MiddleSection
        labels={labels}
        styles={styles?.middleSection}
        selectedFilters={filters?.selectedFilters}
      />
      <BottomSection
        disableApply={filteredSessions?.length === 0}
        styles={styles?.bottomSection}
        onButtonPress={onButtonPress}
        hasSelectedFilters={hasSelectedFilters}
      />
    </View>
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
  const resultText = `${count} ${count > 1 ? 'results' : 'result'}`
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
 * LabelButtons
 * Builds the filter items
 * @param {object} props
 * @param {object} props.styles - styles to be applied to LabelButton
 * @param {Array.<import('SVModels/label').Label>} props.labels - array of label items
 * @param {Array.<import('SVModels/label').Label>} props.selectedFilters - current selected filters
 */
const LabelButtons = ({ styles, labels, selectedFilters = noPropArr }) => {
  /**
   * expected behavior:
   *   - all filters are 'toggled on' by default when no filter is selected
   *   - once a filter item is selected, the rest should be toggled off except for the selected item(s)
   */
  const selectedCount = selectedFilters.length
  const isFilterEmpty = !selectedCount

  return labels.map(label => {
    const isLabelOn = useLabelOn(selectedCount, selectedFilters, label)
    return (
      <LabelButton
        key={label.name}
        styles={styles}
        label={label}
        toggledOn={isFilterEmpty || isLabelOn}
        onPress={label => updateSelectedFilters(label)}
      />
    )
  })
}

/**
 * Creates an array of Labels based on the passed in object
 * @param {object} bookingStates - obj of the form
 *                               - {
 *                                   keyName: string,
 *                                   ...etc
 *                                 }
 * @returns {Array.<import('SVModels/label').Label>}
 */
const createStateLabels = bookingStates => {
  return reduceObj(
    bookingStates,
    (key, value, labels) => {
      labels.push(new Label({ name: wordCaps(value), identifier: key }))
      return labels
    },
    []
  )
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
  const stateLabels = useMemo(() => createStateLabels(filteredBookingStates), [
    filteredBookingStates,
  ])

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
 * BottomSection
 * @param {object} props
 * @param {object} props.styles - default from modal.filter.body.bottomSection theme
 * @param {Function} props.onButtonPress
 * @param {boolean} props.hasSelectedFilters - whether or not the selectedFilters state is empty
 * @param {boolean} props.disableApply - whether the apply btn is disabled or not
 */
const BottomSection = ({
  styles,
  onButtonPress,
  hasSelectedFilters,
  disableApply,
}) => {
  return (
    <View style={styles?.main}>
      { hasSelectedFilters && (
        <Button
          themePath='button.text.default'
          styles={styles?.clearButton}
          onClick={clearSelectedFilters}
          content={'clear filters'}
        />
      ) }
      <EvfButton
        disabled={disableApply}
        type={'primary'}
        styles={styles?.applyButton}
        onClick={onButtonPress}
        text={'APPLY'}
      />
    </View>
  )
}
