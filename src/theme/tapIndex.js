import { app } from './app'
import { layout } from './layout'
import { shadow } from './shadow'
import { navigation } from './navigation'
import * as components from './components'

export const theme = {
  app, 
  ...components,
  navigation,
  layout,
  shadow, 
} 
