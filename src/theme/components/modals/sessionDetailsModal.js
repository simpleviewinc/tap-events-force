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
    pR: 5
  },
  $small: {
    ftSz: 16,
    pR: 10
  },
}

export const sessionDetailsModal = {
  main: {},
  content: {
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
        color: colors.lightGray,
      },
      labelButtons: {
        main: {
          flD: 'row',
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
