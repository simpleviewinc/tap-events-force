import React from 'react'
import { render } from '@testing-library/react'
import { getDefaultTheme, ReThemeProvider } from '@keg-hub/re-theme'
import { Provider } from 'react-redux'
import { getStore } from 'SVStore'

const TestRenderWrapper = ({ children }) => {
  const [activeTheme] = React.useState(getDefaultTheme())

  return (
    <Provider store={getStore()}>
      <ReThemeProvider theme={activeTheme}>{ children }</ReThemeProvider>
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: TestRenderWrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
