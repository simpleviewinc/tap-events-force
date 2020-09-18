import { colors } from '../colors'

export const sessionLink = {
  main: {
    $xsmall: {
      marginTop: 5,
      marginRight: 20,
      flexWrap: 'wrap',
    },
    $small: {
      marginTop: 29,
      marginRight: 79,
    },
  },
  text: {
    $web: {
      width: 'fit-content',
    },
    $native: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
    },
    $all: {
      $xsmall: {
        color: colors.black,
        fontSize: 14,
        lineHeight: 17,
      },
      $small: {
        color: colors.primary,
        fontSize: 16,
        lineHeight: 19,
      },
    },
  },
}
