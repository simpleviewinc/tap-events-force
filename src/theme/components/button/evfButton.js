import { colors } from '../../colors'
import { deepMerge } from '@keg-hub/jsutils'

const content = {
  $xsmall: {
    ltrS: 0.105,
    ftWt: 'bold',
    c: colors.white,
    ftSz: 13,
    lnH: 18,
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
          bgC: colors.lightGray02,
          op: 1,
        },
      },
      content: deepMerge(content, {
        $xsmall: {
          c: colors.lightGray,
          pos: 'relative',
        },
        $small: {
          c: colors.lightGray,
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
    }
  },
  booking: {
    main: {
      flD: 'row',
      jtC: 'center',
    },
    icon: {
      Digit: {
        default: {
          main: {
            jtC: 'center',
            alI: 'center',
            bgC: colors.white,
            bRad: '50%',
            h: 22,
            w: 22,
            mL: 8,
          },
          content: deepMerge(content, {
            $xsmall: {
              tp: 'initial',
              c: colors.primary,
              lnH: 22,
              ftSz: 14,
            },
            $small: {
              ftSz: 14,
            },
          }),
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
          h: 22,
          w: 22,
          mL: 8,
          c: colors.white,
        },
        disabled: {
          border: colors.lightGray02,
          c: colors.lightGray,
        },
      },
    },
  },
  pending: {
    content: {
      color: colors.lightGray,
    },
    icon: {
      color: colors.lightGray,
    },
  },
}

