import { isNative } from 'SVUtils/platform'
import ReactDOM from 'react-dom'

/**
 * Renders the component at a specific location in the DOM tree
 * @param {Component} Component - component to render
 * @param {Element} containerEl - DOM element to render to
 */
export const withPortal = (Component, containerEl) => {
  return !isNative() ? ReactDOM.createPortal(Component, containerEl) : Component
}
