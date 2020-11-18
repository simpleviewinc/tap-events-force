import React, { useState, useEffect, useCallback } from 'react'
import { checkCall } from '@keg-hub/jsutils'
import PropTypes from 'prop-types'
import { ModalContext } from 'SVComponents/modals/modalContext'

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
 * @example
 *  <BaseModal
      dismissedCBRef={dismissedCBRef}
      styles={errorStyles}
      title={title}
      visible={visible}
      Body={BodyComponent}
      Footer={FooterComponent}
    />
 */
export const BaseModal = props => {
  const { title, visible, dismissedCBRef, onDismiss, Body, Footer } = props
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

  return (
    <ModalContext.Consumer>
      { ModalComponent => {
        return (
          <ModalComponent
            modalHeader={title}
            modalBody={Body}
            modalFooter={Footer}
            toggle={onModalClose}
            isOpen={visible && !dismissed}
          />
        )
      } }
    </ModalContext.Consumer>
  )
}

BaseModal.propTypes = {
  visible: PropTypes.bool,
  Body: PropTypes.oneOfType([ PropTypes.func, PropTypes.element ]),
  Footer: PropTypes.oneOfType([ PropTypes.func, PropTypes.element ]),
  hasCloseButton: PropTypes.bool,
  title: PropTypes.string,
  onDismiss: PropTypes.func,
  dismissedCBRef: PropTypes.object,
}
