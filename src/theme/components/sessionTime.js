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
  clockIcon: {
    main: {
      $xsmall: {
        display: 'none',
        width: 19,
        height: 20,
      },
      $small: {
        display: 'flex',
        marginRight: 5,
      },
    },
  },
  timeText: {
    main: {
      flexBasis: 200,
      width: 0,
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
