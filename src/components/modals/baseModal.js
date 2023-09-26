import PropTypes from 'prop-types'
import React, { useContext, useCallback } from 'react'
import { hideActiveModal } from 'SVActions/modals/hideActiveModal'
import { ComponentsContext } from 'SVContexts/components/componentsContext'

export const contentDefaultMaxHeight = 772

/**
 * Renders the modal component (provided by the modal context)
 * @param {object} props
 * @param {object} props.title
 * @param {boolean} props.visible - whether or not the modal is visible
 * @param {Component=} props.Body - Component for the body.
 * @param {Component=} props.Footer - Component for the footer.
 * @param {Function=} props.onDismiss - function that executes when the modal is about to hide itself 
 * (e.g. user clicks outside the modal)
 * @example
 *  <BaseModal
      title={title}
      visible={visible}
      Body={BodyComponent}
      Footer={FooterComponent}
      onDismiss={() => console.log('on dismiss')}
    />
 */
export const BaseModal = props => {
  const {
    title,
    visible,
    onDismiss,
    Body,
    Footer,
    className,
    pageViewNameForGa,
    isScrollable,
  } = props

  const dismiss = useCallback(() => {
    onDismiss?.()
    hideActiveModal()
  }, [onDismiss])

  const { ModalComponent } = useContext(ComponentsContext)

  return (
    <ModalComponent
      modalHeader={title}
      modalBody={Body}
      modalFooter={Footer}
      toggle={dismiss}
      isOpen={visible}
      className={className}
      pageViewNameForGa={pageViewNameForGa}
      isScrollable={isScrollable}
    />
  )
}

BaseModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  Body: PropTypes.oneOfType([ PropTypes.func, PropTypes.element ]),
  Footer: PropTypes.oneOfType([ PropTypes.func, PropTypes.element ]),
  onDismiss: PropTypes.func,
}
