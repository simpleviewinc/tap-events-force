import { deepMerge } from '@keg-hub/jsutils'
import { colors } from '../../colors'

const content = {
  $xsmall: {
    ltrS: 0.105,
    ftSz: 13,
    lnH: 22,
    alS: 'center',
    pos: 'relative',
  },
  $small: {
    ftSz: 15,
  },
}

export const evfButton = {
  main: {
    $all: {
      ovf: 'hidden',
      h: 51,
      pB: 1,
    },
    $web: {
      minW: 'fit-content',
    },
  },
  button: {
    default: { content: content },
    disabled: {
      main: {
        $all: {
          op: 1,
        },
      },
      content: deepMerge(content, {
        $xsmall: {
          pos: 'relative',
        },
        $small: {
          pos: 'relative',
        },
      }),
    },
  },
  processing: {
    main: {
      flD: 'row',
      jtC: 'center',
    },
    icon: {
      size: 22,
    },
    content: {
      ...content,
      mL: 8,
    },
  },
  booking: {
    main: {
      flD: 'row',
      jtC: 'center',
      alI: 'center',
    },
    longText: {
      $xsmall: {
        text: {
          lnH: 12,
          ftSz: 12,
          letterSpacing: 0,
          mT: -1,
          mB: -1,
        },
        icon: {
          Digit: {
            default: {
              main: {
                mL: 0,
                mR: -8,
              },
            },
          },
        },
      },
      $medium: {
        text: {
          ftSz: 15,
          lnH: 22,
        },
        icon: {
          Digit: {
            default: {
              main: {
                mL: 8,
                mR: 'initial',
              },
            },
          },
        },
      },
    },
    icon: {
      Digit: {
        default: {
          main: {
            jtC: 'center',
            alI: 'center',
            bRad: 22 / 2,
            mL: 8,
          },
          circle: {},
          digit: {
            $web: {
              $xsmall: {
                tp: 'initial',
              },
            },
            $all: {
              $xsmall: {
                lnH: 15,
                ftSz: 12,
                ltrS: 0.105,
                ftWt: 700,
                color: colors.white,
              },
            },
          },
        },
        disabled: {
          main: {},
          text: {},
        },
      },
      BookingCheck: {
        default: {
          h: 22,
          w: 22,
          mL: 8,
        },
        disabled: {},
      },
    },
  },
  pending: {
    content: {},
    icon: {},
  },
}
