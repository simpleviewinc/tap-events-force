import { colors } from '../../colors'

const textViewStyle = {
  main: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  content: {
    fontSize: 15,
    lineHeight: '18px',
    letterSpacing: '0.105em',
    fontWeight: 'bold',
    color: colors.white,
    paddingHorizontal: 19,
  },
}

const defaultMainStyle = {
  width: 120,
  height: 45,
}

export const evfButton = {
  $web: {
    default: {
      main: defaultMainStyle,
      content: {
        svg: {
          main: {
            fill: colors.default,
          },
          content: {
            textView: textViewStyle,
          },
        },
      },
    },
    primary: {
      main: defaultMainStyle,
      content: {
        svg: {
          main: {
            fill: colors.primary,
          },
          content: {
            textView: textViewStyle,
          },
        },
      },
    },
  },
}
