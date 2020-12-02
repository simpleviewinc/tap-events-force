import React, { useState, useEffect, useCallback, useContext } from 'react'
import { checkCall } from '@keg-hub/jsutils'
import { removeModal } from 'SVActions/modals/removeModal'
import { ModalContext } from 'SVContexts/modals/modalContext'
import PropTypes from 'prop-types'

export const contentDefaultMaxHeight = 772

/**
 *
 * @param {object} props
 * @param {object} props.title
 * @param {boolean} props.visible
 * @param {React.MutableRefObject=} props.dismissedCBRef - pass this in when you want to dismiss modal from child
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
  const {
    title,
    visible,
    dismissedCBRef,
    onDismiss,
    index,
    Body,
    Footer,
  } = props
  // two possible cases for a non visible modal
  // 1. modal is mounted/in store but has been animated out of view by another modal
  // 2. modal has been removed from the store
  const [ dismissed, setDismissed ] = useState(false)
  useEffect(() => {
    if (dismissedCBRef) {
      dismissedCBRef.current = setDismissed
      return () => {
        dismissedCBRef.current = undefined
      }
    }
  }, [ setDismissed, dismissedCBRef ])

  const onModalClose = useCallback(() => {
    checkCall(onDismiss, true)
    setDismissed(true)
  }, [ setDismissed, onDismiss ])

  // once the dismiss animation completes, then remove modal from store
  const onDismissed = useCallback(() => dismissed && removeModal(index), [
    index,
  ])

  const { setCloseActiveModal, ModalComponent } = useContext(ModalContext)
  setCloseActiveModal(onModalClose)

  return (
    <ModalComponent
      modalHeader={title}
      modalBody={Body}
      modalFooter={Footer}
      toggle={onModalClose}
      isOpen={visible && !dismissed}
      onClosed={onDismissed}
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
