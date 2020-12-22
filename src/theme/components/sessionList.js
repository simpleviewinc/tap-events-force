import { colors } from '../colors'
import { deepMerge } from '@keg-hub/jsutils'


export const sessionList = {
  main: {
    maxWidth: '100vw',
    position: 'relative',
    margin: '10em auto 30em',
    overscrollBehavior: 'contain',
  },
  content: {
    divider: {
      backgroundColor: colors.dimTextGray,
      margin: 0,
      marginBottom: 41,
    }
  }
}
