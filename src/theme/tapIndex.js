import { app } from './app'
import { colors } from './colors'
import { typography } from './typography'
import * as components from './components'
import * as containers from './containers'
import { deepMerge, noOpObj } from '@keg-hub/jsutils'
import { setDefaultTheme } from '@keg-hub/re-theme'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'

/**
 * Custom theme config object
 * Allows overwriting the theme defaults for keg-components
 */
const themeConfig = {
  typography,
  defaults: noOpObj,
}

export const theme = setDefaultTheme(
  kegComponentsTheme(
    themeConfig,
    // Pass in custom theme values to be added to the global theme object
    deepMerge({ app, colors, typography }, components, containers)
  )
)
