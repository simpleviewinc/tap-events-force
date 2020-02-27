import React from 'react';
import { useTheme } from 're-theme'
import { ModalContentBox } from './modalContentBox'
import PropTypes from 'prop-types'

/**
 * Simple popup modal in absolute positioning with a title, text, and dismiss button.
 * @param {Object} props
 * @param {Boolean} props.visible - if true, show the modal, else hide it
 * @param {Function} props.onDismiss - the function to execute when the user selects the dismiss button
 * @param {String} props.title - title of modal
 * @param {String} props.text - text content of modal
 * @param {String} props.animation - animation type for native modal. @see https://reactnative.dev/docs/modal#animationtype
 * @param {Function} props.ModalElement - the modal implementation to use; depends on platform. @see `confirmModal.web` and `confirmModal.native`
 */
export const ModalWrapper = ({ visible=false, onDismiss, title, text, ModalElement }) => {
  const theme = useTheme()
  return (
    <ModalElement
      style={theme.get(
        'modal.view',
        'layout.absolute.center',
        'shadow.popup'
      )}
      visible={visible}
      onDismiss={onDismiss}
    >
      <ModalContentBox 
        title={title}
        text={text}
        onDismiss={onDismiss}
      />
    </ModalElement>
  )
}

ModalWrapper.propTypes = {
  visible: PropTypes.bool,
  onDismiss: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
}
