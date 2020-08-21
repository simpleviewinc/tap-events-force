import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { BaseModal } from './baseModal'
import { Text, View } from 'SVComponents'
import { EvfButton } from 'SVComponents/button'

export const Error = ({ visible, title, message }) => {
  const theme = useTheme()
  const errorStyles = theme.get('modal.error')

  return (
    <BaseModal
      styles={errorStyles}
      title={title}
      visible={visible}
      BodyComponent={
        <Body
          styles={errorStyles.content.body}
          message={message}
        />
      }
    />
  )
}

const Body = ({ styles, message }) => {
  return (
    <View style={styles.main}>
      <Text style={styles.content?.text}>{ message }</Text>
      <EvfButton
        type={'primary'}
        styles={styles.content?.button}
        onPress={() => console.log('clicked')}
        text={'OK'}
      />
    </View>
  )
}
