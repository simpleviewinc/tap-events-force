import React from 'react'
import { render } from '@testing-library/react'
import { getDefaultTheme, ReThemeProvider } from '@keg-hub/re-theme'
import { Provider } from 'react-redux'
import { ComponentsProvider } from 'SVContexts/components/componentsProvider'
import { getStore } from 'SVStore'
import { evfModalBuilder } from '../mocks/eventsforce/evfModalBuilder'
import { EvfButton } from '../mocks/eventsforce/evfButton'
import 'SVTheme/tapIndex'

import 'bootstrap/dist/css/bootstrap.min.css'

const TestRenderWrapper = ({ children }) => {
  const [activeTheme] = React.useState(getDefaultTheme())

  // Replicating rootContainer.js setup
  const SessionsModal = React.useMemo(
    () => evfModalBuilder({ className: 'evf-modal' }),
    []
  )

  return (
    <Provider store={getStore()}>
      <ReThemeProvider theme={activeTheme}>
        <ComponentsProvider
          ButtonComponent={EvfButton}
          ModalComponent={SessionsModal}
        >
          { children }
        </ComponentsProvider>
      </ReThemeProvider>
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: TestRenderWrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
