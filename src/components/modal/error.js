import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { BaseModal } from './baseModal'
import { View, Text } from 'SVComponents'
import { EvfButton } from 'SVComponents/button'

/**
 * Error modal
 * @param {object} props
 * @param {boolean} visible
 * @param {string} title - text to show in header
 * @param {string} message - text to show in body
 */
export const Error = ({ visible, title, message }) => {
  const theme = useTheme()
  const errorStyles = theme.get('modal.error')

  return (
    <BaseModal
      dataSet={Error.dataSet.main}
      styles={errorStyles}
      title={title}
      visible={visible}
      BodyComponent={({ setDismissed }) => {
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
 * Body of error modal
 * @param {object} props
 * @param {object} styles
 * @param {string} message - string to display
 * @param {Function} setDismissed - callback from BaseModal to dismiss the modal
 */
const Body = ({ styles, message, setDismissed }) => {
  return (
    <View
      dataSet={Error.dataSet.content.body.main}
      style={styles.main}
    >
      <Text
        dataSet={Error.dataSet.content.body.content.text}
        style={styles.content?.text}
      >
        { message }
      </Text>
      <EvfButton
        type={'primary'}
        styles={styles.content?.button}
        onPress={() => setDismissed(true)}
        text={'OK'}
      />
    </View>
  )
}

Error.dataSet = {
  main: { class: `error-modal-main` },
  content: {
    body: {
      main: { class: 'error-modal-content-body-main' },
      content: {
        text: { class: 'error-modal-content-body-content-text' },
      },
    },
  },
}
