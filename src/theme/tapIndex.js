import { app } from './app'
import { colors } from './colors'
import { typography } from './typography'
import * as components from './components'
import * as containers from './containers'
import { eventsForce } from './eventsForce'
import { deepMerge, noOpObj } from '@keg-hub/jsutils'
import { setDefaultTheme } from '@keg-hub/re-theme'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'

/**
 * Custom theme config object
 * Allows overwriting the theme defaults for keg-components
 */
const themeConfig = {
  defaults: noOpObj,
}

export const theme = setDefaultTheme(
  kegComponentsTheme(
    themeConfig,
    // Pass in custom theme values to be added to the global theme object
    deepMerge(
      { eventsForce: { labels: eventsForce } },
      { app, colors, typography },
      components,
      containers
    )
  )
)
