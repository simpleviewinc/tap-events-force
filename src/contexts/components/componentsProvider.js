import React, { useMemo } from 'react'
import { ComponentsContext } from './componentsContext'

/**
 * ComponentsProvider for the components passed as props context.
 * @param {Object} props
 * @param {Object} props.ButtonComponent - Custom button component
 * @param {Object} props.ModalComponent - Custom modal component
 * @param {*} props.children - children of the context
 */
export const ComponentsProvider = ({
  ButtonComponent,
  ModalComponent,
  CheckboxComponent,
  SessionDetailsModalContents,
  children,
}) => {
  const comps = useMemo(
    () => ({
      ButtonComponent,
      ModalComponent,
      CheckboxComponent,
      SessionDetailsModalContents,
    }),
    [
      ButtonComponent,
      ModalComponent,
      CheckboxComponent,
      SessionDetailsModalContents,
    ]
  )

  return (
    <ComponentsContext.Provider value={comps}>
      { children }
    </ComponentsContext.Provider>
  )
}
