import { colors } from '../../colors'

export const dayToggle = {
  main: {
    $all: {
      $xsmall: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      $small: {
        width: 300,
      },
    },
    $native: {
      $xsmall: {
        width: '100%',
        justifyContent: 'flex-start',
      },
    },
  },
  content: {
    text: {
      $native: {
        $xsmall: {
          marginLeft: 45,
          marginRight: 45,
          fontSize: 20,
        },
      },
      $all: {
        $xsmall: {
          letterSpacing: 0.1,
          textDecorationLine: 'underline',
          fontStyle: 'normal',
          fontWeight: '500',
          color: colors.black01,
        },
        $small: {
          fontSize: 20,
        },
      },
      $web: {
        $xsmall: {
          fontFamily: 'Inter',
          fontSize: '18px',
          letterSpacing: '0.1em',
          marginLeft: 10,
          marginRight: 16,
        },
        $small: {
          fontSize: '20px',
        },
      },
    },
    decrement: {
      icon: {
        $native: {
          fontSize: 20,
        },
      },
    },
    increment: {
      icon: {
        $native: {
          fontSize: 20,
        },
      },
    },
  },
}
