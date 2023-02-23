import { colors } from '../../colors'
import { sessionsList } from './sessionsList'

export const sessions = {
  main: {
    $web: {
      flex: 1,
      width: '100vw',
      maxWidth: '100%',
    },
    $native: {
      flexDirection: 'column',
      width: '100%',
    },
    $all: {
      $xsmall: {
        backgroundColor: colors.white01,
        padding: 20,
      },
      $small: {
        padding: 50,
      },
    },
  },
  content: {
    list: sessionsList,
  },
}
