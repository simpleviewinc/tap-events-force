import { deepMerge } from 'jsutils'
import { app } from './app'
import { eventsForce } from './eventsForce'
import { shadow } from './shadow'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'
import * as components from './components'

export const theme = deepMerge(
  kegComponentsTheme,
  { eventsForce, shadow, app },
  components
)
