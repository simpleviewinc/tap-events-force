import { colors } from '../colors'

const mainStyle = {
  $xsmall: {
    mT: 5,
    mR: 20,
    flWr: 'wrap',
  },
  $small: {
    mT: 29,
    mR: 79,
  },
}

const textStyle = {
  $web: {
    width: 'fit-content',
  },
  $native: {
    flD: 'row',
    alS: 'flex-start',
  },
  $all: {
    $xsmall: {
      c: colors.black,
      ftSz: 14,
      lnH: 17,
    },
    $small: {
      c: colors.primary,
      ftSz: 16,
      lnH: 19,
    },
  },
}

export const sessionLink = {
  default: {
    main: mainStyle,
    text: textStyle,
  },
  hover: {
    text: {
      $all: {
        $xsmall: { 
          txDL: 'underline' 
        },
      },
    },
  },
}
