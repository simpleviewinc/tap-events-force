import React, { useRef, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { View, Text } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { checkCall } from '@keg-hub/jsutils'

/**
 * Error modal
 * @param {object} props
 * @param {boolean} props.visible
 * @param {string} props.title - text to show in header
 * @param {string} props.message - text to show in body
 */
export const Error = ({ visible, title, message }) => {
  const theme = useTheme()
  const errorStyles = theme.get('modal.error')
  const dismissedCBRef = useRef()

  return (
    <BaseModal
      dissmissedCBRef={dismissedCBRef}
      styles={errorStyles}
      title={title}
      visible={visible}
    >
      <Body
        onButtonPress={useCallback(
          () => checkCall(dismissedCBRef.current, true),
          [dismissedCBRef?.current]
        )}
        styles={errorStyles.content.body}
        message={message}
      />
    </BaseModal>
  )
}

/**
 * Body of error modal
 * @param {object} props
 * @param {object} props.styles
 * @param {string} props.message - string to display
 * @param {Function} props.onButtonPress
 */
const Body = ({ styles, message, onButtonPress }) => {
  return (
    <View style={styles.main} >
      <Text style={styles.content?.text} >
        { message }
      </Text>
      <EvfButton
        type={'primary'}
        styles={styles.content?.button}
        onClick={onButtonPress}
        text={'OK'}
      />
    </View>
  )
}
