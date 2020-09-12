import React, { useRef, useCallback, useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { View, Text } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { checkCall } from '@keg-hub/jsutils'
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
  // const theme = useTheme()

  const statesLabel = []
  mapObj(Values.SESSION_BOOKING_STATES, (key, value) => {
    statesLabel.push(new Label({ name: capitalize(value) }))
  })

  const { filters } = useSelector(
    ({ items }) => pickKeys(items, ['filters']),
    shallowEqual
  )
  console.log({ filters })

  return (
    <View style={styles.main}>
      <View style={styles.content?.labelButtons?.main}>
        { labels.map(label => {
          const shouldRemove = filters.selectedFilters.includes(label.name)
            ? true
            : false
          return (
            <LabelButton
              key={label.name}
              toggledOn={shouldRemove}
              label={label}
              onPress={label => updateSelectedFilters(label.name, shouldRemove)}
            />
          )
        }) }
      </View>

      <View style={styles.content?.stateButtons?.main}>
        { statesLabel.map(label => {
          const shouldRemove = filters.selectedFilters.includes(label.name)
            ? true
            : false

          return (
            <LabelButton
              key={label.name}
              style={styles.content?.stateButtons?.content?.item}
              label={label}
              toggledOn={shouldRemove}
              onPress={label => updateSelectedFilters(label.name, shouldRemove)}
            />
          )
        }) }
      </View>
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
