import { colors } from '../../colors'

export const checkboxGroup = {
  main: {},
  item: {
    content: {
      main: {
        $xsmall: {
          width: 20,
          height: 20,
        },
        $small: {
          width: 15,
          height: 15,
        },
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      },
      area: {
        off: {
          $web: {
            margin: '0 auto',
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
          position: 'unset',
          $xsmall: {
            width: 12,
            // height: 12,
          },
          $small: {
            width: 10,
            // height: 10,
          },
        },
      },
    },
  },
}
