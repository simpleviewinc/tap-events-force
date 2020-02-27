import React from 'react';
import { Modal } from 'react-native'
import { ModalWrapper } from './confirmModal.wrapper'

/**
 * Simple popup modal in absolute positioning with a title, text, and dismiss button.
 * @param {Object} props - @see `confirmModal.wrapper` props
 */
export const ConfirmModal = (props) => (
  <ModalWrapper 
    ModalElement={NativeModal}
    { ...props }
  />
)

ConfirmModal.propTypes = ModalWrapper.propTypes

/**
 * The native modal implementation
 * @param {Object} props - @see `confirmModal.wrapper` props
 */
const NativeModal = (props) => {

  const { 
    animation="slide",
    onDismiss, 
    visible=false, 
    style,
    children,
  } = props 

  return (
    <Modal
      style={style}
      visible={visible}
      animationType={animation}
      onRequestClose={onDismiss}
    >
      { children }
    </Modal>
  )
}

