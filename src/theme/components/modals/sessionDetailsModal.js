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
    pR: 5,
  },
  $small: {
    ftSz: 16,
    pR: 10,
  },
}

export const sessionDetailsModal = {
  main: {},
  content: {
    body: {
      scrollView: {
        main: {
          flex: 1,
        },
        contentContainer: {},
      },
      row1: {
        dateTimeText: defaultHeaderTextStyle,
        button: {
          main: {
            minH: 45,
          },
        },
      },

      locationText: {
        mT: 13,
        ...defaultHeaderTextStyle,
        ltrS: 0.105,
        c: colors.lightGray,
      },
      labelButtons: {
        main: {
          flD: 'row',
          mT: -5,
        },
        button: labelButtonDefault,
      },
    },
    footer: {
      main: {
        alI: 'center',
      },
    },
  },
}
