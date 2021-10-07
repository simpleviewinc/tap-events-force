import { colors } from '../../colors'

export const gridTileContent = {
  main: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginRight: 12,
  },
  row1: {
    main: {
      flexDirection: 'row',
    },
  },
  locationText: {
    ftSz: 16,
    ftWt: '500',
    lnH: 19,
    color: colors.darkGray,
    mT: 18,
  },
  presenters: {
    main: {
      fl: 1,
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
