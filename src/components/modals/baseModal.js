import React, { useContext, useCallback } from 'react'
import { ModalContext } from 'SVContexts/modals/modalContext'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'
import PropTypes from 'prop-types'

export const contentDefaultMaxHeight = 772

/**
 * Renders the modal component (provided by the modal context)
 * @param {object} props
 * @param {object} props.title
 * @param {boolean} props.visible - whether or not the modal is visible
 * @param {Component=} props.Body - Component for the body.
 * @param {Component=} props.Footer - Component for the footer.
 * @param {boolean=} props.hasCloseButton - to display the close button on the header or not
 * @param {Function=} props.onDismiss - function to call when the modal is being dismissed
 * @example
 *  <BaseModal
      dismissedCBRef={dismissedCBRef}
      title={title}
      visible={visible}
      index={modalStackIndex}
      Body={BodyComponent}
      Footer={FooterComponent}
    />
 */
export const BaseModal = props => {
  const { title, visible, onDismiss, onClosed, Body, Footer } = props

  const dismiss = useCallback(() => {
    onDismiss?.()
    hideActiveModal()
  }, [onDismiss])

  const { ModalComponent } = useContext(ModalContext)

  return (
    <ModalComponent
      modalHeader={title}
      modalBody={Body}
      modalFooter={Footer}
      toggle={dismiss}
      onClosed={onClosed}
      isOpen={visible}
    />
  )
}

BaseModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  Body: PropTypes.oneOfType([ PropTypes.func, PropTypes.element ]),
  Footer: PropTypes.oneOfType([ PropTypes.func, PropTypes.element ]),
  hasCloseButton: PropTypes.bool,
  onDismiss: PropTypes.func,
}
