import { colors } from '../../colors'

export const dayToggle = {
  $web: {
    main: {
      $xsmall: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      $small: {
        width: 300,
      },
    },
    content: {
      text: {
        $xsmall: {
          letterSpacing: '0.1em',
          textDecorationLine: 'underline',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '18px',
          color: colors.black01,
          marginLeft: 10,
          marginRight: 16,
        },
        $small: {
          fontSize: '20px',
        },
      },
      decrementIcon: {
        main: {},
      },
      incrementIcon: {
        main: {},
      },
    },
  },
}
