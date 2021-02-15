/**
 * IMPORTANT - should not be imported into the main sessions component export
 * This is for DEVELOPMENT only
 * https://docs.google.com/document/d/1oTOhGc1fpG0VhqXTq4ZumceZWoi1ln17wFVxG9SmlDE
 */
/*
 * This is a demo button component. The real component gets passed in from the Sessions Component consumer
 * This is basically just a HOC, but called as a function directly
 *
 * It will return a functional component to be passed into the Session Component as a prop
 *
 * This allows the EU team to define the button in what ever format is needed, including passing in the props
 * While at the same time, it allows the session component to define the content of the button
 */
export const EvfButton = ({
  children,
  disabled,
  buttonType,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-button-type={buttonType}
    >
      { children }
    </button>
  )
}
