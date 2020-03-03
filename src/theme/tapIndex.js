import { deepMerge } from 'jsutils'
import { app } from './app'
import { layout } from './layout'
import { shadow } from './shadow'
import { theme as kegComponentsTheme } from 'keg-components'
import * as components from './components'
import { navigation } from './navigation'

export const theme = deepMerge(
  app, 
  ...components,
  kegComponentsTheme,
  layout,
  modal, 
  navigation,
  shadow
)
