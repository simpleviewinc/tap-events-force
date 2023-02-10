/**
 * IMPORTANT - should not be imported into the main sessions component export
 * This is for DEVELOPMENT only
 * https://docs.google.com/document/d/1oTOhGc1fpG0VhqXTq4ZumceZWoi1ln17wFVxG9SmlDE
 */
import React from 'react'
import { Button } from '@old-keg-hub/keg-components'
import { Values } from 'SVConstants'

const { BUTTON_TYPES } = Values

/**
 * Maps the internal button type to a default bootstrap button color prop
 * Only used when developing the session component
 */
const typeToColorMap = {
  [BUTTON_TYPES.SELECT_SESSION]: 'info',
  [BUTTON_TYPES.MODAL_PRIMARY]: 'primary',
  [BUTTON_TYPES.MODAL_SECONDARY]: 'secondary',
  [BUTTON_TYPES.ICON_BUTTON]: 'iconButton',
}

/**
 * Placeholder component for rendering on Mobile
 */
export const EvfButton = ({
  children,
  disabled,
  buttonType,
  className,
  onClick,
  ...props
}) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={typeToColorMap[buttonType]}
    >
      { children }
      { text } count: { bookedCount }, mode: { bookingMode }, isProcessing: className{ ' ' }
      { text }= { className }, buttonNameForGa: { buttonNameForGa },
      sessionDetailsChevronIsOpen:{ sessionDetailsChevronIsOpen }
      { iconName }
      { isProcessing }
    </Button>
  )
}
