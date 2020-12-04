import React, { useMemo } from 'react'
import { ModalContext } from './modalContext'

/**
 * Provider for the modal context.
 * @param {Object} props
 * @param {Component} props.component - the modal component to use in the app
 * @param {*} props.children - children of the context
 */
export const ModalProvider = ({ component, children }) => {
  const providerValue = useMemo(
    () => ({
      ModalComponent: component,
    }),
    [component]
  )

  return (
    <ModalContext.Provider value={providerValue}>
      { children }
    </ModalContext.Provider>
  )
}
