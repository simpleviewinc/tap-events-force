// IMPORTANT - should not be imported into the main sessions component export
// This is for DEVELOPMENT only

import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './testStyles.css'

/*
 * This is a demo modal component. The real component gets passed in from the Sessions Component consumer
 * This is basically just a HOC, but called as a function directly
 *
 * It will return a functional component to be passed into the Session Component as a prop
 *
 * This allows the EU team to define the modal in what ever format is needed, including passing in the props
 * While at the same time, it allows the session component to define the content of the modal
 */
export const evfModalBuilder = parentProps => {
  // Returns a function which should be passed as a prop to the Sessions Component
  // Will replace the current internal Modal of the Sessions Component
  return ({
    modalHeader,
    modalBody,
    modalFooter,
    toggle,
    isOpen,
    size = 'lg',
  }) => {
    return (
      // Render the Modal component as needed with the passed in parent props
      // Call the renderProp passed in from the session component
      // The isOpen and toggle props should be owned by the Session component ( US Team )
      // All other modal parentProps come from the X5 app ( EU Team )
      // The toggle and isOpen props ( US Team ) should override the parentProps ( EU Team )
      <Modal
        {...parentProps}
        id='test-modal'
        isOpen={isOpen}
        toggle={toggle}
        size={size}
      >
        <ModalHeader className='modal-header-test'>{ modalHeader }</ModalHeader>
        { modalBody && <ModalBody>{ modalBody }</ModalBody> }
        { modalFooter && <ModalFooter>{ modalFooter }</ModalFooter> }
      </Modal>
    )
  }
}
