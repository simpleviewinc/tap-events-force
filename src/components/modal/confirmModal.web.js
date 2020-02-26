import React from 'react';
import { useTheme } from 're-theme'
import { ModalContentBox } from './modalContentBox'
import Modal from 'modal-enhanced-react-native-web'
import PropTypes from 'prop-types'

/**
 * Simple popup modal in absolute positioning with a title, text, and dismiss button.
 * @param {Object} props
 * @param {Boolean} props.visible - if true, show the modal, else hide it
 * @param {Function} props.onDismiss - the function to execute when the user selects the dismiss button
 * @param {String} props.title 
 * @param {String} props.text 
 */
export const ConfirmModal = ({ visible=false, onDismiss, title, text }) => {
  const theme = useTheme()
  return (
    <Modal
      style={theme.join(
        theme.modal.view,
        theme.layout.absolute.center,
        theme.shadow.popup 
      )}
      isVisible={visible}
      onBackdropPress={onDismiss}
    >
      <ModalContentBox 
        title={title}
        text={text}
        onDismiss={onDismiss}
      />
    </Modal>
  )
}

ConfirmModal.propTypes = {
  visible: PropTypes.bool,
  onDismiss: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
}
