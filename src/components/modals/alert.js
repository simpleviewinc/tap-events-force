import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { BaseModal } from './baseModal'
import { View, Text, ScrollView } from '@old-keg-hub/keg-components'
import { EvfButton } from 'SVComponents/button/evfButton'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'
import { Values } from 'SVConstants'
const { BUTTON_TYPES } = Values

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

  return (
    <BaseModal
      className={`ef-modal-alert`}
      title={title}
      visible={visible}
      Body={<Body
        styles={alertStyles?.content?.body}
        message={message}
      />}
      Footer={
        <Footer
          styles={alertStyles?.content?.footer}
          onButtonPress={hideActiveModal}
        />
      }
    />
  )
}

/**
 * Body of alert modal
 * @param {object} props
 * @param {object} props.styles
 * @param {string} props.message - string to display
 */
const Body = ({ styles, message }) => {
  return (
    <View
      style={styles?.main}
      className={[ 'ef-modal-sub-header', 'ef-modal-alert-body' ]}
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
    </View>
  )
}

/**
 * Footer
 * @param {object} props
 * @param {object} props.styles
 * @param {Function} props.onButtonPress
 */
const Footer = ({ styles, onButtonPress }) => {
  return (
    <EvfButton
      buttonType={BUTTON_TYPES.MODAL_PRIMARY}
      className={`ef-modal-alert-button`}
      type={'primary'}
      styles={styles?.button}
      onClick={onButtonPress}
      text={'OK'}
    />
  )
}
