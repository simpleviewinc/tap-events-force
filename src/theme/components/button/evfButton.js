import { colors } from '../../colors'

const topLeftCornerStyle = {
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

const defaultButtonStyles = {
  main: {
    $all: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 0,
      padding: 0,
    },
    $web: {
      boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.15)',
    },
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

/**
 * Sets up the different button states with the given color
 * @param {string} backgroundColor
 */
const buttonStateStyles = backgroundColor => {
  return {
    default: {
      main: {
        $all: {
          ...defaultButtonStyles.main.$all,
          backgroundColor,
        },
        $web: defaultButtonStyles.main.$web,
      },
      content: defaultButtonStyles.content,
    },
    active: {
      main: {
        $all: {
          ...defaultButtonStyles.main.$all,
          backgroundColor,
          opacity: 0.4,
        },
        $web: defaultButtonStyles.main.$web,
      },
      content: defaultButtonStyles.content,
    },
    hover: {
      main: {
        $all: {
          ...defaultButtonStyles.main.$all,
          backgroundColor,
          opacity: 0.8,
        },
        $web: defaultButtonStyles.main.$web,
      },
      content: defaultButtonStyles.content,
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
      topLeftCorner: topLeftCornerStyle,
      button: buttonStateStyles(colors.default),
    },
  },
  primary: {
    main: defaultMainStyle,
    content: {
      topLeftCorner: topLeftCornerStyle,
      button: buttonStateStyles(colors.primary),
    },
  },
}
