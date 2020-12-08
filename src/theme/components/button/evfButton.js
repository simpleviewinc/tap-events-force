import { colors } from '../../colors'
import { deepMerge, reduceObj } from '@keg-hub/jsutils'
import { Values } from 'SVConstants/values'

const { SESSION_BOOKING_STATES } = Values

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
    position: 'relative',
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
          minHeight: 50,
        },
        $web: {
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.15)',
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
    default: buildButtonState({
      main: { $all: { backgroundColor } },
    }),
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
    height: 51,
    pB: 1,
  },
  $web: {
    minWidth: 'fit-content',
  },
}

const processingStyles = {
  main: {
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

const bookingStyles = {
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    Digit: {
      default: {
        main: {
          jtC: 'center',
          alI: 'center',
          bgC: colors.white,
          bRad: '50%',
          mR: 8,
          mT: 2,
        },
        text: {
          ...defaultTextStyle,
          $xsmall: {
            ...defaultTextStyle.$xsmall,
            tp: 'initial',
            c: colors.primary,
            pV: 2,
            pH: 7,
            ftSz: 14,
          },
          $small: {
            ftSz: 14,
          },
        },
      },
      disabled: {
        main: {
          bgC: colors.lightGray,
        },
        text: {
          c: colors.lightGray02,
        },
      },
    },
    BookingCheck: {
      default: {
        border: colors.primary,
        height: 21,
        c: colors.white,
        pR: 8,
      },
      disabled: {
        border: colors.lightGray02,
        c: colors.lightGray,
      },
    },
  },
}

const buttonStyles = {
  default: {
    main: defaultMainStyle,
    content: {
      topLeftCorner: topLeftCornerStyle,
      button: buttonStateStyles(colors.second),
      processing: processingStyles,
      bookingState: bookingStyles,
    },
  },
  primary: {
    main: defaultMainStyle,
    content: {
      topLeftCorner: topLeftCornerStyle,
      button: buttonStateStyles(colors.primary),
      processing: processingStyles,
      bookingState: bookingStyles,
    },
  },
}

const primaryDisabledState = buildButtonState({
  main: {
    $all: {
      backgroundColor: colors.lightGray02,
      opacity: 1,
    },
  },
  content: {
    $xsmall: {
      ...defaultTextStyle.$xsmall,
      color: colors.lightGray,
      position: 'relative',
    },
    $small: {
      ...defaultTextStyle.$small,
      color: colors.lightGray,
      position: 'relative',
    },
  },
})

const bookingButtonStates = reduceObj(
  SESSION_BOOKING_STATES,
  (__, value, styles) => {
    styles[value] = deepMerge(buttonStyles.primary, {
      content: {
        button: {
          ...buttonStyles.primary.content.button,
          disabled: primaryDisabledState,
        },
      },
    })

    return styles
  }
)

export const evfButton = {
  ...buttonStyles,
  ...bookingButtonStates,
}
