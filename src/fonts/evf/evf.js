// Should be imported from @expo, NOT react-native-vector-icons
// import { createIconSet } from '@expo/vector-icons'

// Only works with require when using rollup ?
// The rollup export uses the same relative path './evf.ttf'
// So we will need to copy over the font file into the build directory

// const fontFile = require('./evf.ttf')
import fontFile from './evf.ttf'

const glyphMap = {
  clock: '\u0063',
  close: '\u0064',
}

export const EVFIcons = createIconSet(glyphMap, 'evf', fontFile)
// export const EVFIcons = glyphMap

// This is how it's defined in the Expo docs for importing a font
// Maybe a better option then above, and works with rollup export

// import * as Font from 'expo-font'
// import { createIconSet } from '@expo/vector-icons'

// const glyphMap = {
//   clock: '\u0063',
//   close: '\u0064',
// }

// export const EVFIcons = createIconSet(glyphMap, 'evf', './evf.ttf')
