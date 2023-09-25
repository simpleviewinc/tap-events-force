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
  AgendaLayoutRenderer,
  PresenterFilterComponent,
  shouldShowPresenterFilter,
  children,
}) => {
  const comps = useMemo(
    () => ({
      ButtonComponent,
      ModalComponent,
      CheckboxComponent,
      SessionDetailsModalContents,
      AgendaLayoutRenderer,
      PresenterFilterComponent,
      shouldShowPresenterFilter,
    }),
    [
      ButtonComponent,
      ModalComponent,
      CheckboxComponent,
      SessionDetailsModalContents,
      AgendaLayoutRenderer,
      PresenterFilterComponent,
      shouldShowPresenterFilter,
    ]
  )

  return (
    <ComponentsContext.Provider value={comps}>
      { children }
    </ComponentsContext.Provider>
  )
}
