import { colors } from '../../colors'

const topLeftCornerStyle = {
  main: {
    $web: {
      left: '-13px',
      top: '-13px',
    },
    $all: {
      left: -13,
      top: -13,
      width: 25,
      height: 25,
      backgroundColor: colors.white,
      position: 'absolute',
      overflow: 'hidden',
      zIndex: 9999,
      transform: [{ rotate: '45deg' }],
    },
  },
}

const defaultTextStyle = {
  $xsmall: {
    letterSpacing: 0.105,
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 13,
    paddingHorizontal: 8,
    lineHeight: 18,
    alignSelf: 'center',
  },
  $small: {
    fontSize: 15,
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
  content: defaultTextStyle,
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
    disabled: {
      main: {
        $all: {
          ...defaultButtonStyles.main.$all,
          backgroundColor,
          opacity: 0.6,
        },
        $web: defaultButtonStyles.main.$web,
      },
      content: defaultButtonStyles.content,
    },
  }
}

const defaultMainStyle = {
  $all: {
    overflow: 'hidden',
    flex: 1,
  },
  $web: {
    minWidth: 'fit-content',
  },
}

const processingStyles = {
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    size: 20,
  },
  text: {
    ...defaultTextStyle,
    marginHorizontal: 10,
  },
}

export const evfButton = {
  default: {
    main: defaultMainStyle,
    content: {
      topLeftCorner: topLeftCornerStyle,
      button: buttonStateStyles(colors.default),
      processing: processingStyles,
    },
  },
  primary: {
    main: defaultMainStyle,
    content: {
      topLeftCorner: topLeftCornerStyle,
      button: buttonStateStyles(colors.primary),
      processing: processingStyles,
    },
  },
}
