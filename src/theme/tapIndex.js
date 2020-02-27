import { deepMerge } from 'jsutils'
import { app } from './app'
import { modal } from './modal'
import { shadow } from './shadow'
import { theme as kegComponentsTheme } from 'keg-components'

export const theme = deepMerge(
  kegComponentsTheme,
  app, 
  modal, 
  shadow
)
