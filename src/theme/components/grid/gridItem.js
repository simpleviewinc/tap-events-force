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
        flex: '1 1 333px',
        marginHorizontal: 3,
        marginBottom: 6,
        padding: 15,
        paddingTop: 20,
        flexDirection: 'column',
        minHeight: 294,
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
    labelList: {
      main: {
        $xsmall: {
          marginRight: 14,
        },
        $small: {
          marginRight: 0,
        },
      },
    },
  },
}
