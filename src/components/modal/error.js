import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { BaseModal } from './baseModal'
import { View, Text } from 'SVComponents'
import { EvfButton } from 'SVComponents/button'

/**
 *
 * @param {*} param0
 */
export const Error = ({ visible, title, message }) => {
  const theme = useTheme()
  const errorStyles = theme.get('modal.error')

  return (
    <BaseModal
      styles={errorStyles}
      title={title}
      visible={visible}
      BodyComponent={setDismissed => {
        return (
          <Body
            styles={errorStyles.content.body}
            message={message}
            setDismissed={setDismissed}
          />
        )
      }}
    />
  )
}

/**
 *
 * @param {*} param0
 */
const Body = ({ styles, message, setDismissed }) => {
  return (
    <View style={styles.main}>
      <Text style={styles.content?.text}>{ message }</Text>
      <EvfButton
        type={'primary'}
        styles={styles.content?.button}
        onPress={() => setDismissed(true)}
        text={'OK'}
      />
    </View>
  )
}
