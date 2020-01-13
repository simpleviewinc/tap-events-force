import { padding, margin } from 'SVTheme/layout'
import { colors } from 'SVTheme/colors'

export const write = {
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
        paddingTop: padding.size,
        paddingBottom: padding.size * 4
      },
      $web: {
        top: 'calc( 100vh - 100px)',
        width: '100vw',
      },
      $native: {
        width: '100%',
        top: '93%',
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
        },
        $web: {
          marginTop: 0,
        },
        $native: {
          height: 50,
        }
      },
      field: {
        paddingTop: 0
      },
    },
    button: {
      $all: {
        height: 56,
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
