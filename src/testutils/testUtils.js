/**
 * @jest-environment jsdom
 */
import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { getDefaultTheme, ReThemeProvider } from '@keg-hub/re-theme'
import { Provider } from 'react-redux'
import { ComponentsProvider } from 'SVContexts/components/componentsProvider'
import { getStore } from 'SVStore'
import { EvfButton } from '../mocks/eventsforce/evfButton'
import 'SVTheme/tapIndex'

import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * Simple mock modal. We have to do this b/c the bootstrap modal we use for testing
 * does not render in the part of the DOM that is accessible by the testing libraries.
 * This should be fine, because the modal is injected by the consumer anyway.
 */
const TestModal = ({ modalHeader, modalBody, modalFooter }) => {
  return (
    <div>
      <div id='modal-header'>{ modalHeader }</div>
      <div id='modal-body'>{ modalBody }</div>
      <div id='modal-footer'>{ modalFooter }</div>
    </div>
  )
}

/**
 * Environment setup for each test. Matches the same environment
 * as the real app.
 */
const TestRenderWrapper = ({ children }) => {
  const [activeTheme] = React.useState(getDefaultTheme())

  return (
    <Provider store={getStore()}>
      <ReThemeProvider theme={activeTheme}>
        <ComponentsProvider
          ButtonComponent={EvfButton}
          ModalComponent={TestModal}
        >
          { children }
        </ComponentsProvider>
      </ReThemeProvider>
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: TestRenderWrapper, ...options })

/**
 * Helper for integration tests to update the window dimensions in order to
 * test responsive components
 */
const resizeWindow = (width, height) => {
  window.innerWidth = width
  window.innerHeight = height
  return window.dispatchEvent(new Event('resize'))
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render, resizeWindow, userEvent }
