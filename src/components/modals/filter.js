import React, { useRef, useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { View, Text } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { sortLabels } from 'SVUtils'
import { LabelButton } from 'SVComponents/labels/labelButton'
import { Label } from 'SVModels/label'
import { Values } from 'SVConstants/values'
import { reduceObj, capitalize, pickKeys } from '@keg-hub/jsutils'
import { useSelector, shallowEqual } from 'react-redux'
import {
  updateSelectedFilters,
  applySessionFilters,
  clearSelectedFilters,
} from 'SVActions/session/filters'
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

  return (
    <BaseModal
      dissmissedCBRef={dismissedCBRef}
      styles={filterStyles}
      title={'Filter'}
      visible={visible}
      onDismiss={clearSelectedFilters}
    >
      <Content
        styles={filterStyles?.content?.body}
        labels={labelsMemo}
        onButtonPress={applySessionFilters}
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
  return (
    <View style={styles?.main}>
      <TopSection styles={styles?.topSection} />
      <MiddleSection
        labels={labels}
        styles={styles?.middleSection}
      />
      <BottomSection
        styles={styles?.bottomSection}
        onButtonPress={onButtonPress}
      />
    </View>
  )
}

/**
 *
 * @param {object} props
 * @param {object} props.styles - default from modal.filter.body.topSection
 */
const TopSection = ({ styles }) => {
  return (
    <View style={styles?.main}>
      <Text
        style={styles?.content?.leftText}
        className={'ef-modal-body-highlight'}
      >
        Only Show:
      </Text>
    </View>
  )
}

/**
 * LabelButtons
 * Builds the filter items
 * @param {object} props
 * @param {object} props.styles - styles to be applied to LabelButton
 * @param {Array.<import('SVModels/label').Label>} props.labels - array of label items
 */
const LabelButtons = ({ styles, labels }) => {
  /**
   * expected behavior:
   *   - all filters are 'toggled on' by default when no filter is selected
   *   - once a filter item is selected, the rest should be toggled off except for the selected item(s)
   */
  const { filters } = useSelector(
    ({ items }) => pickKeys(items, ['filters']),
    shallowEqual
  )

  const selectedCount = filters.selectedFilters.length
  const isFilterEmpty = !filters.activeFilters.length && !selectedCount

  return labels.map(label => {
    // Check selectedCount before doing the loop. If none are selected, we same a few cpu cycles
    const isLabelOn =
      selectedCount &&
      filters.selectedFilters.some(item => item.identifier === label.identifier)

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
      labels.push(new Label({ name: capitalize(value), identifier: key }))
      return labels
    },
    []
  )
}
/**
 * MiddleSection
 * @param {object} props
 * @param {object} props.styles - default from modal.filter.body.middleSection
 * @param {Array.<import('SVModels/label').Label>} props.labels - array of label items
 */
const MiddleSection = ({ styles, labels }) => {
  const stateLabels = useMemo(
    () => createStateLabels(Values.SESSION_BOOKING_STATES),
    [Values.SESSION_BOOKING_STATES]
  )

  return (
    <View>
      <View style={styles?.labelButtons?.main}>
        <LabelButtons
          styles={styles.labelButtons?.item}
          labels={labels}
        />
      </View>

      <View style={styles?.stateButtons?.main}>
        <LabelButtons
          styles={styles?.stateButtons?.item}
          labels={stateLabels}
        />
      </View>
    </View>
  )
}

/**
 * BottomSection
 * @param {object} props
 * @param {object} props.styles - default from modal.filter.body.bottomSection theme
 * @param {Function} props.onButtonPress
 */
const BottomSection = ({ styles, onButtonPress }) => {
  return (
    <View style={styles?.main}>
      <EvfButton
        type={'primary'}
        styles={styles?.button}
        onClick={onButtonPress}
        text={'APPLY'}
      />
    </View>
  )
}
