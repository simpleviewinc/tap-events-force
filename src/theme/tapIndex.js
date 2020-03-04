import { deepMerge } from 'jsutils'
import { app } from './app'
import { layout } from './layout'
import { shadow } from './shadow'
import { navigation } from './navigation'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'
import * as components from './components'

export const theme = deepMerge(
  kegComponentsTheme,
  {
    app, 
    ...components,
    layout,
    navigation,
    shadow
  }
)
