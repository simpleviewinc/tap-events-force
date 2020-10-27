import { colors } from '../../colors'

const presenterSessionLink = {
  main: {
    $xsmall: {
      mT: 13,
    },
    $small: {
      mR: 10,
    },
  },
}
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
    price: {
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: 19,
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
      flD: 'row',
      mR: 79,
      flWr: 'wrap',
    },
    sessionLink: {
      default: presenterSessionLink,
      hover: presenterSessionLink,
    },
  },
  buttonSection: {
    main: {
      $web: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end',
      },
    },
    bookingButton: {
      main: {
        height: 50,
      },
    },
  },
}
