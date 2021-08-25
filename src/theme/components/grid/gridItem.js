import { colors } from '../../colors'
import { gridTileContent } from './gridTileContent'
import { gridRowContent } from './gridRowContent'

export const gridItem = {
  main: {
    $all: {
      $xsmall: {
        bgC: colors.white,
        mB: 15,
        alI: 'flex-start',
      },
      $small: {
        mH: 3,
        mB: 6,
        p: 15,
        pT: 20,
        flD: 'column',
        minH: 294,
      },
    },
    $web: {
      $small: {
        fl: '1 1 333px',
      },
    },
  },
  gridTileContent,
  gridRowContent,
  sessionTime: {
    main: {
      $web: {
        h: 'fit-content',
      },
      $native: {
        flD: 'row',
        alS: 'flex-start',
      },
      $all: {
        mT: 13,
        fl: 1,
      },
    },
  },
  label: {
    main: {
      $xsmall: {
        m: 0,
      },
      $small: {
        mT: 8,
        mR: 8,
      },
    },
  },
}
