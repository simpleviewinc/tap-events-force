import { colors } from '../../colors'

const labelButtonDefault = {
  selected: {
    default: {
      main: {
        mT: 8,
        mR: 8,
      },
    },
  },
}

const defaultHeaderTextStyle = {
  $xsmall: {
    ftWt: '600',
    lnH: 19,
    ftSz: 14,
  },
  $small: {
    ftSz: 16,
  },
}

export const sessionDetailsModal = {
  main: {},
  content: {
    main: {},
    body: {
      main: {
        flex: 1,
      },
      scrollView: {
        main: {
          mH: 43,
          mT: 50,
          mB: 21,
        },
        contentContainer: {
          pH: 29,
        },
      },
      dateTimeText: defaultHeaderTextStyle,
      locationText: {
        mT: 13,
        ...defaultHeaderTextStyle,
        ltrS: 0.105,
        color: colors.lightGray,
      },
      labelButtons: {
        main: {
          flD: 'row',
        },
        button: labelButtonDefault,
      },
      presenters: {
        main: {
          mB: 18,
        },
        text: {
          $xsmall: {
            mT: 10,
            ftSz: 14,
          },
          $small: {
            mT: 20,
            ftSz: 16,
          },
        },
      },
      summaryText: {
        $xsmall: {
          lnH: 22,
          mB: 29,
          ftSz: 14,
          color: colors.lightGray,
        },
        $small: {
          ftSz: 16,
        },
      },
      actionButton: {
        main: {
          pT: 21,
          pB: 31,
          pR: 26,
          alI: 'flex-end',
        },
        button: {
          main: {
            minH: 45,
          },
        },
      },
    },
  },
}
