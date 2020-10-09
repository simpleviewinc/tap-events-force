import { colors } from '../../colors'

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
      main: {
        pH: 43,
        pT: 50,
        pB: 21,
      },
      dateTimeText: defaultHeaderTextStyle,
      locationText: {
        mT: 13,
        ...defaultHeaderTextStyle,
        ltrS: 0.105,
        color: colors.lightGray,
      },
    },
  },
}
