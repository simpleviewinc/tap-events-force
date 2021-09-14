import { deepMerge } from '@keg-hub/jsutils'

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
    },
    longText: {
      text: {
        lnH: 15,
        ftSz: 12,
        letterSpacing: 0,
      },
      icon: {
        Digit: {
          default: {
            main: {
              mL: 0,
              mR: -6,
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
            h: 22,
            w: 22,
            mL: 8,
          },
          content: deepMerge(content, {
            $web: {
              $xsmall: {
                tp: 'initial',
              },
            },
            $all: {
              $xsmall: {
                lnH: 22,
                ftSz: 14,
              },
              $small: {
                ftSz: 14,
              },
            },
          }),
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
