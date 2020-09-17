import { colors } from '../../colors'

export const checkboxGroup = {
  main: {},
  item: {
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
  },
}
