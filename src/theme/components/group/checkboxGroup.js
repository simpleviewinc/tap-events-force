import { colors } from '../../colors'
import { deepMerge } from '@keg-hub/jsutils'

const primaryItem = {
  content: {
    main: {
      // on mobile, the checkbox should be larger so it is easier to press with a finger
      $web: {
        width: 15,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      },
    },
    area: {
      off: {
        $web: {
          boxSizing: 'border-box',
          borderWidth: 2,
          borderRadius: 4,
          borderColor: colors.default,
          backgroundColor: colors.white,
          boxShadow: null,
        },
      },
      on: {
        $web: {
          borderColor: colors.primary,
          backgroundColor: colors.primary,
        },
      },
    },
    indicator: {
      on: {
        $web: {
          position: 'unset',
          $xsmall: {
            width: 12,
          },
          $small: {
            width: 10,
          },
        },
      },
    },
  },
}

const alternateItem = deepMerge(primaryItem, {
  content: {
    area: {
      on: {
        $web: {
          borderColor: colors.default,
          backgroundColor: colors.default,
        },
      },
    },
  },
})

export const checkboxGroup = {
  main: {},
  item: {
    primary: primaryItem,
    alternate: alternateItem,
  },
}
