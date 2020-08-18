import { deepMerge } from 'jsutils'
import { app } from './app'
import { eventsForce } from './eventsForce'
import { modal } from './components'
import { shadow } from './shadow'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'
import * as components from './components'
import * as containers from './containers'
import { configureTheme } from './theme.config'

configureTheme()

export const theme = deepMerge(
  kegComponentsTheme,
  { eventsForce, shadow, app, modal },
  components,
  containers
)
