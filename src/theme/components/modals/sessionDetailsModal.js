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
        main: {},
        contentContainer: {
          $xsmall: {
            pH: 19,
          },
          $small: {
            pH: 29,
          },
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
    },
    footer: {
      main: {
        alI: 'flex-end',
      },
      button: {
        main: {
          minH: 45,
        },
      },
    },
  },
}
