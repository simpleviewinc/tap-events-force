import { text } from '../text'
import { colors } from '../../colors'

const textViewStyle = {
  main: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  content: {
    ...text,
    fontSize: 15,
    lineHeight: '18px',
    letterSpacing: '0.105em',
    fontWeight: 'bold',
    color: '#FFFFFF',
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
