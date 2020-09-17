import { deepMerge } from '@keg-hub/jsutils'
import { app } from './app'
import { eventsForce } from './eventsForce'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'
import * as components from './components'
import * as containers from './containers'
import { configureTheme } from './theme.config'
import { colors } from './colors'
import { typography } from './typography'

configureTheme()

export const theme = deepMerge(
  kegComponentsTheme,
  { eventsForce, app, colors, typography },
  components,
  containers
)
