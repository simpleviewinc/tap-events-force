import { colors } from '../../colors'
import { deepMerge } from '@keg-hub/jsutils'

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

const buildButtonState = stateStyles =>
  deepMerge(
    {
      main: {
        $all: {
          flex: 1,
          justifyContent: 'center',
          borderRadius: 0,
        },
      },
      content: defaultTextStyle,
    },
    stateStyles
  )

/**
 * Sets up the different button states with the given color
 * @param {string} backgroundColor
 */
const buttonStateStyles = backgroundColor => {
  return {
    default: buildButtonState({ main: { $all: { backgroundColor } } }),
    active: buildButtonState({
      main: { $all: { backgroundColor, opacity: 0.4 } },
    }),
    hover: buildButtonState({
      main: { $all: { backgroundColor, opacity: 0.8 } },
    }),
    disabled: buildButtonState({
      main: { $all: { backgroundColor, opacity: 0.6 } },
    }),
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
      button: buttonStateStyles(colors.second),
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
