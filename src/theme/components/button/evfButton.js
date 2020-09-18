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
    flex: 1,
    justifyContent: 'center',
    borderRadius: 0,
    padding: 0,
    boxShadow: ' 0px 1px 1px rgba(0, 0, 0, 0.15)',
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
        ...defaultButtonStyles.main,
        backgroundColor,
      },
      content: defaultButtonStyles.content,
    },
    active: {
      main: {
        ...defaultButtonStyles.main,
        backgroundColor,
        opacity: 0.4,
      },
      content: defaultButtonStyles.content,
    },
    hover: {
      main: {
        ...defaultButtonStyles.main,
        backgroundColor,
        opacity: 0.8,
      },
      content: defaultButtonStyles.content,
    },
  }
}

const defaultMainStyle = {
  $web: {
    overflow: 'hidden',
    flex: 1,
  },
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
