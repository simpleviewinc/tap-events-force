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
  ftSz: 16,
  ftWt: '600',
  lnH: 19,
}

export const sessionDetailsModal = {
  main: {},
  content: {
    main: {},
    body: {
      main: {},
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
          mT: 20,
          ftSz: 16,
        },
      },
    },
  },
}
