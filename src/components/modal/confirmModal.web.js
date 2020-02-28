import React from 'react';
import { ModalWrapper } from './confirmModal.wrapper'
import Modal from 'modal-enhanced-react-native-web'
import PropTypes from 'prop-types'

/**
 * Simple popup modal in absolute positioning with a title, text, and dismiss button.
 * @param {Object} props - @see `confirmModal.wrapper` props
 */
export const ConfirmModal = (props) => (
  <ModalWrapper 
    ModalElement={WebModal}
    { ...props }
  />
)

ConfirmModal.propTypes = {
  visible: PropTypes.bool,
  onDismiss: PropTypes.func,
  title: PropTypes.string,
  text: PropTypes.string,
}

/**
 * The modal implementation fro web
 * @param {Object} props - @see `confirmModal.wrapper` props
 */
const WebModal = (props) => {

  const { 
    onDismiss, 
    visible=false, 
    children,
    style,
  } = props 

  return (
    <Modal
      style={style}
      isVisible={visible}
      onBackdropPress={onDismiss}
    >
      { children }
    </Modal>
  )
}

