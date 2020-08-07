import { createIconSet } from 'react-native-vector-icons'
import fontFile from './evf.ttf'

const glyphMap = {
  chevronLeft: '\u0021',
  chevronRight: '\u0022',
  clock: '\u0023',
  close: '\u0024',
}

export const EVFIcons = createIconSet(glyphMap, 'evf', fontFile)
