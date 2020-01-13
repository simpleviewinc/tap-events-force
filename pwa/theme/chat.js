import { padding, margin } from 'SVTheme/layout'
import { colors } from 'SVTheme/colors'

export const chat = {
  input: {
    container: {
      $all: {
        position: 'absolute',
        backgroundColor: colors.lightGray,
        flexDirection: 'row',
        borderTopStyle: 'solid',
        borderTopWidth: 2,
        borderTopColor: colors.divider,
        ...padding(padding.size / 2),
      },
      $web: {
        top: 'calc( 100vh - 100px)',
        width: '100vw',
      },
      $native: {
        width: '100%',
        top: '93%',
        paddingBottom: padding.size * 4
      },
    },
    wrapper: {
      $all: {
        backgroundColor: colors.white,
        marginRight: margin.size / 2,
      },
      $web: {
        width: 'calc( 100% - 165px)',
      },
      $native: {
        width: '75%',
        height: 50,
        borderRadius: 5
      },
    },
    textField: {
      wrapper: {
        $all: {
          height: 50,
        },
        $web: {
          ...margin(margin.size, [ 'left', 'right' ]),
        },
        $native: {
          height: 50,
        }
      },
      field: {},
    },
    button: {
      $all: {
        height: 50,
      },
      $web: {
        width: 150,
      },
      $native: {
        padding: 0
      }
    }
  },
}