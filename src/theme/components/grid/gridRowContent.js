import { colors } from '../../colors'

export const gridRowContent = {
  main: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  column2: {
    main: {
      flex: 1,
      flexDirection: 'column',
      pB: 10,
      pL: 10,
    },
    row1: {
      main: {
        flexDirection: 'row',
        alI: 'flex-end'
      },
    },
    locationText: {
      mT: 8,
      ftSz: 16,
      lnH: 19,
      ftWt: '500',
      color: colors.lightGray,
    },
    drawerContent: {
      main: {
        flex: 1,
        pR: 15,
        pT: 10,
      },
      bookingButton: {
        main: {
          mB: 10,
        },
      },
    },
  },
}
