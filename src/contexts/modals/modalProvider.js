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
      setCloseActiveModal: closeFn => (closeModalRef.current = closeFn),
      closeActiveModal: () => checkCall(closeModalRef.current),
    }),
    [ closeModalRef, component ]
  )

  return (
    <ModalContext.Provider value={providerValue}>
      { children }
    </ModalContext.Provider>
  )
}
