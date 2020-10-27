import { colors } from '../colors'
import { deepMerge } from '@keg-hub/jsutils'

const mainStyle = {
  $xsmall: {
    marginTop: 5,
    marginRight: 20,
    flexWrap: 'wrap',
  },
  $small: {
    marginTop: 29,
    marginRight: 79,
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
    main: mainStyle,
    text: deepMerge(textStyle, {
      $all: {
        $xsmall: { txDL: 'underline' },
      },
    }),
  },
}
