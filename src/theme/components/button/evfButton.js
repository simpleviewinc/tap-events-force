import { colors } from '../../colors'

const boxStyle = {
  main: {
    width: 25,
    height: 25,
    backgroundColor: colors.white,
    position: 'absolute',
    overflow: 'hidden',
    left: '-13px',
    top: '-13px',
    zIndex: 9999,
    transform: [{ rotate: '45deg' }],
  },
}

const defaultButtonStyles = backgroundColor => {
  return {
    main: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 0,
      padding: 0,
      backgroundColor,
    },
    content: {
      $xsmall: {
        letterSpacing: '0.105em',
        fontWeight: 'bold',
        color: colors.white,
        fontSize: 13,
        paddingHorizontal: 8,
        lineHeight: '18px',
      },
      $small: {
        fontSize: 15,
      },
    },
  }
}
const defaultMainStyle = {
  overflow: 'hidden',
  flex: 1,
}

export const evfButton = {
  default: {
    main: defaultMainStyle,
    content: {
      box: boxStyle,
      button: defaultButtonStyles(colors.default),
    },
  },
  primary: {
    main: defaultMainStyle,
    content: {
      box: boxStyle,
      button: defaultButtonStyles(colors.primary),
    },
  },
}
