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
  locationText: {
    ftSz: 16,
    ftWt: '500',
    lnH: 19,
    c: colors.darkGray,
    mT: 18,
  },
  presenters: {
    main: {
      /**
       * Fill the remaining space of the grid tile, to
       * push the label-list to the bottom of the tile
       */
      flG: 1,
    },
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
