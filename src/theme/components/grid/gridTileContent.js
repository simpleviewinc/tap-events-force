import { colors } from '../../colors'

export const gridTileContent = {
  main: {
    fl: 1,
    w: '100%',
    flD: 'column',
    mR: 12,
  },
  row1: {
    main: {
      flD: 'row',
    },
  },
  location: {
    main: {
      mT: 16
    },
    text: {
      ftSz: 16,
      ftWt: '500',
      lnH: 19,
      color: colors.darkGray,
    },
  },
  presenters: {
    container: {
      flWr: 'wrap',
      flD: 'row',
    },
    sessionLink: {
      main: {
        $xsmall: {
          mT: 13,
        },
        $small: {
          mR: 10,
        },
      },
    },
  },
}
