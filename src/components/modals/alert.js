import React, { useRef, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { View, Text, ScrollView } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { checkCall } from '@keg-hub/jsutils'

/**
 * Alert modal
 * @param {object} props
 * @param {boolean} props.visible
 * @param {string} props.title - text to show in header
 * @param {string} props.message - text to show in body
 * @param {'error'|null} props.type - alert type
 */
export const Alert = ({ visible, title, message }) => {
  const theme = useTheme()
  const alertStyles = theme.get('modal.alert')
  const dismissedCBRef = useRef()

  return (
    <BaseModal
      className={`ef-modal-alert`}
      dismissedCBRef={dismissedCBRef}
      styles={alertStyles}
      title={title}
      visible={visible}
    >
      <Body
        onButtonPress={useCallback(
          () => checkCall(dismissedCBRef.current, true),
          [dismissedCBRef?.current]
        )}
        styles={alertStyles.content.body}
        message={message}
      />
    </BaseModal>
  )
}

/**
 * Body of alert modal
 * @param {object} props
 * @param {object} props.styles
 * @param {string} props.message - string to display
 * @param {Function} props.onButtonPress
 */
const Body = ({ styles, message, onButtonPress }) => {
  return (
    <View
      style={styles?.main}
      className={`ef-modal-sub-header ef-modal-alert-body`}
    >
      <ScrollView
        style={styles?.textContainer?.main}
        contentContainerStyle={styles?.textContainer?.contentContainerStyle}
      >
        <Text
          className={`ef-modal-alert-text`}
          style={styles?.text}
        >
          { message }
        </Text>
      </ScrollView>
      <EvfButton
        className={`ef-modal-alert-button`}
        type={'primary'}
        styles={styles?.button}
        onClick={onButtonPress}
        text={'OK'}
      />
    </View>
  )
}
