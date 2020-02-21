import { app } from './app'
import { modal } from './modal'
import { mask } from './mask'
import { layout } from './layout'
import { qr } from './qr'
import { shadow } from './shadow'
import { navigation } from './navigation'
import * as boxes from './box'

export const theme = {
  app, 
  ...boxes,
  modal, 
  mask,
  navigation,
  layout,
  qr,
  shadow, 
} 
