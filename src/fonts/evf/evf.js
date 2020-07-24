import { createIconSet } from 'react-native-vector-icons'
import fontFile from './evf.ttf'

const glyphMap = {
  clock: '\u0063',
  close: '\u0064',
}

export const EVFIcons = createIconSet(glyphMap, 'evf', fontFile)
