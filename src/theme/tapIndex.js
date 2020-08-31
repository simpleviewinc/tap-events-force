import { deepMerge } from '@svkeg/jsutils'
import { app } from './app'
import { eventsForce } from './eventsForce'
import { modal } from './components'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'
import * as components from './components'
import * as containers from './containers'
import { configureTheme } from './theme.config'
import { colors } from './colors'
import { typography } from './typography'

configureTheme()

export const theme = deepMerge(
  kegComponentsTheme,
  { eventsForce, app, modal, colors, typography },
  components,
  containers
)
