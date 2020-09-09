import React, { useRef, useCallback } from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { View, Text } from '@keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { checkCall } from '@keg-hub/jsutils'

export const Filter = ({ visible, labels }) => {
  const theme = useTheme()
  const errorStyles = theme.get('modal.error')
  const dismissedCBRef = useRef()

  return (
    <BaseModal
      dissmissedCBRef={dismissedCBRef}
      styles={errorStyles}
      title={'Filter'}
      visible={visible}
    >
      <Body
        onButtonPress={useCallback(
          () => checkCall(dismissedCBRef.current, true),
          [dismissedCBRef?.current]
        )}
        styles={errorStyles.content.body}
        // message={message}
      />
    </BaseModal>
  )
}

/**
 * Body of filter modal
 * @param {object} props
 * @param {object} props.styles
 * @param {string} props.message - string to display
 * @param {Function} props.onButtonPress
 */
const Body = ({ styles, message, onButtonPress }) => {
  return (
    <View style={styles.main}>
      <Text style={styles.content?.text}>{ message }</Text>
      <EvfButton
        type={'primary'}
        styles={styles.content?.button}
        onClick={onButtonPress}
        text={'APPLY'}
      />
    </View>
  )
}
