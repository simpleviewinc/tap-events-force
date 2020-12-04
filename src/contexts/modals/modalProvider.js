import React, { useRef, useMemo } from 'react'
import { ModalContext } from './modalContext'
import { checkCall } from '@keg-hub/jsutils'

/**
 * Provider for the modal context.
 * @param {Object} props
 * @param {Component} props.component - the modal component to use in the app
 * @param {*} props.children - children of the context
 */
export const ModalProvider = ({ component, children }) => {
  const closeModalRef = useRef()

  const providerValue = useMemo(
    () => ({
      ModalComponent: component,

      /**
       * Stores in the Modal Context the callback used to close the active modal
       * @param {Function} closeFn - the function that closes the active modal
       */
      setDismissActiveModal: closeFn => (closeModalRef.current = closeFn),

      /**
       * Closes the currently visible modal
       */
      dismissActiveModal: () => checkCall(closeModalRef.current),
    }),
    [ closeModalRef, component ]
  )

  return (
    <ModalContext.Provider value={providerValue}>
      { children }
    </ModalContext.Provider>
  )
}
