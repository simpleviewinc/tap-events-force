import React, { useRef, useCallback, useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { View, Text } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { checkCall } from '@keg-hub/jsutils'
import { LabelList } from 'SVComponents/labels/labelList'
import { sortLabels } from 'SVUtils'
import { LabelButton } from 'SVComponents/labels/labelButton'
import { Label } from 'SVModels/label'
import { Values } from 'SVConstants/values'
import { mapObj, capitalize, pickKeys } from '@keg-hub/jsutils'
import { useSelector, shallowEqual } from 'react-redux'
import { updateSelectedFilters } from 'SVActions/session/filters'
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
    >
      <Content
        styles={filterStyles.content.body}
        labels={labelsMemo}
        onButtonPress={useCallback(
          () => checkCall(dismissedCBRef.current, true),
          [dismissedCBRef?.current]
        )}
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
      <TopSection styles={styles?.content?.topSection} />
      <MiddleSection
        labels={labels}
        styles={styles?.content?.middleSection}
      />
      <BottomSection
        styles={styles?.content?.bottomSection}
        onButtonPress={onButtonPress}
      />
    </View>
  )
}

const TopSection = ({ styles }) => {
  return (
    <View style={styles?.main}>
      <Text
        style={styles?.content?.leftText}
        className={'EF-modal-body-highlight'}
      >
        Only Show:
      </Text>
    </View>
  )
}

const MiddleSection = ({ styles, labels }) => {
  console.log({ labels })
  const { filters } = useSelector(
    ({ items }) => pickKeys(items, ['filters']),
    shallowEqual
  )
  console.log({ filters })
  const statesLabel = []
  mapObj(Values.SESSION_BOOKING_STATES, (key, value) => {
    statesLabel.push(new Label({ name: capitalize(value) }))
  })
  /**
   * selectedFilters
   */
  // 1. if labelButton press
  // 2.
  return (
    <View style={styles.main}>
      <LabelList
        style={styles.content?.labelList?.main}
        itemStyle={styles.content?.labelList?.content?.item}
        LabelComponent={LabelButton}
        labels={labels}
        onItemPress={label => {
          console.log({ label })
        }}
      />

      <View>
        { /* check selectedFilters */ }
        { /* if selectedFilter[i] === label.name 
          set themePath to button.outline.default */ }
        { statesLabel.map(label => (
          <LabelButton
            key={label.name}
            style={labelStyle}
            label={label}
            onPress={label => updateSelectedFilters(label.name)}
          />
        )) }
      </View>
      { /* <LabelList
        style={styles.content?.labelList?.main}
        itemStyle={styles.content?.labelList?.content?.item}
        LabelComponent={LabelButton}
        labels={statesLabel}
        onItemPress={label => updateSelectedFilters(label.name)}
      /> */ }
    </View>
  )
}

const BottomSection = ({ styles, onButtonPress }) => {
  return (
    <View style={styles.main}>
      <EvfButton
        type={'primary'}
        styles={styles.content?.button}
        onClick={onButtonPress}
        text={'APPLY'}
      />
    </View>
  )
}
