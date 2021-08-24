import { colors } from '../../colors'
import { gridTileContent } from './gridTileContent'
import { gridRowContent } from './gridRowContent'

export const gridItem = {
  main: {
    $all: {
      $xsmall: {
        backgroundColor: colors.white,
        marginBottom: 15,
        alignItems: 'flex-start',
      },
      $small: {
        marginHorizontal: 3,
        marginBottom: 6,
        padding: 15,
        paddingTop: 20,
        flexDirection: 'column',
        minHeight: 294,
      },
    },
    $web: {
      $small: {
        flex: '1 1 333px',
      },
    },
  },
  gridTileContent,
  gridRowContent,
  sessionTime: {
    main: {
      $web: {
        height: 'fit-content',
      },
      $native: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
      },
      $all: {
        marginTop: 13,
        flex: 1,
      },
    },
  },
  label: {
    main: {
      $xsmall: {
        margin: 0,
      },
      $small: {
        marginTop: 8,
        marginRight: 8,
      },
    },
  },
}
