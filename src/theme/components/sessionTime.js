import { colors } from '../colors'

export const sessionTime = {
  main: {
    $xsmall: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 0,
      margin: 0,
    },
    $small: {
      flex: 1,
    },
  },
  timeText: {
    main: {
      $web: {
        flex: '1 1 200px',
        width: 0,
      },
    },
    content: {
      $xsmall: {
        color: colors.lightGray01,
      },
      $small: {
        color: colors.black,
      },
    },
  },
}
