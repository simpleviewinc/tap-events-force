/**
 * IMPORTANT - should not be imported into the main sessions component export
 * This is for DEVELOPMENT only
 * https://docs.google.com/document/d/1oTOhGc1fpG0VhqXTq4ZumceZWoi1ln17wFVxG9SmlDE
 */
import React from 'react'
import { Button } from 'reactstrap'
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
  [BUTTON_TYPES.SESSION_DETAILS_CHEVRON_CLOSED]: 'sessionDetailsChevronClosed',
  [BUTTON_TYPES.SESSION_DETAILS_CHEVRON_OPEN]: 'sessionDetailsChevronOpen',
  [BUTTON_TYPES.LINK]: 'link',
}

/**
 * This is a demo button component. The real component gets passed in from the Sessions Component consumer
 * This is basically just a HOC, but called as a function directly
 *
 * It will return a functional component to be passed into the Session Component as a prop
 *
 * This allows the EU team to define the button in what ever format is needed, including passing in the props
 * While at the same time, it allows the session component to define the content of the button
 */
export const EvfButton = ({
  disabled,
  buttonType,
  className,
  onClick,
  sessionBookingState,
  bookedCount,
  bookingMode,
  text,
  isProcessing,
}) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      disabled={disabled}
      color={typeToColorMap[buttonType]}
      data-button-type={buttonType}
      title={
        'sessionBookingState: ' +
        sessionBookingState +
        ' bookedCount: ' +
        bookedCount +
        ' bookingMode: ' +
        bookingMode
      }
    >
      { text }
    </Button>
  )
}
