import React, { useRef, useMemo } from 'react'
import { ModalContext } from './modalContext'
import { checkCall } from '@keg-hub/jsutils'

export const ModalProvider = ({ component, children }) => {
  const closeModalRef = useRef()

  const providerValue = useMemo(
    () => ({
      ModalComponent: component,
      setCloseModal: closeFn => (closeModalRef.current = closeFn),
      closeModal: () => checkCall(closeModalRef.current),
    }),
    [ closeModalRef, component ]
  )

  return (
    <ModalContext.Provider value={providerValue}>
      { children }
    </ModalContext.Provider>
  )
}
