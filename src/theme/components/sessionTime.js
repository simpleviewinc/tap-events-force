import { colors } from '../colors'

export const sessionTime = {
  main: {
    $web: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 0,
      margin: 0,
    },
  },
  clockIcon: {
    main: {
      $xsmall: {
        $web: {
          display: 'none',
          width: 19,
          height: 20,
        },
      },
      $small: {
        $web: {
          display: 'flex',
          marginRight: 5,
        },
      },
    },
  },
  timeText: {
    main: {
      $web: {
        flexBasis: 200,
        width: 0,
      },
    },
    content: {
      $xsmall: {
        $web: {
          color: colors.lightGray01,
        }
      },
      $small: {
        $web: {
          color: colors.black,
        },
      },
    },
  },
}
