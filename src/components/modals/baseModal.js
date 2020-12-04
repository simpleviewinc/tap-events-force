import React, { useContext, useCallback } from 'react'
import { ModalContext } from 'SVContexts/modals/modalContext'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'
import PropTypes from 'prop-types'

export const contentDefaultMaxHeight = 772

/**
 *
 * @param {object} props
 * @param {object} props.title
 * @param {boolean} props.visible
 *                                                        -  call `childRef.current(true)` to dismiss
 * @param {Component=} props.Body - Component for the body.
 * @param {Component=} props.Footer - Component for the footer.
 * @param {boolean=} props.hasCloseButton - to display the close button on the header or not
 * @param {Function=} props.onDismiss - function to call when the modal is being dismissed
 * @param {number?} props.index - index of this modal in the modal stack. Define it to ensure that the right modal
 * is removed from the modal stack when this modal is dismissed.
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
  dismissedCBRef: PropTypes.shape({ current: PropTypes.any }),
  index: PropTypes.number,
}
