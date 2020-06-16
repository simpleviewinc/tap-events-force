import { deepMerge } from 'jsutils'
import { app } from './app'
import { modal } from './modal'
import { shadow } from './shadow'
import { kegComponentsTheme } from 'SVTheme/kegComponentsTheme'

export const theme = deepMerge(kegComponentsTheme, app, modal, shadow)
