import { colors } from '../../colors'
import { gridTileContent } from './gridTileContent'
import { gridRowContent } from './gridRowContent'

export const gridItem = {
  main: {
    $xsmall: {
      backgroundColor: colors.white,
      height: 200,
      marginBottom: 15,
      alignItems: 'flex-start',
    },
    $small: {
      flex: 1,
      marginHorizontal: 3,
      marginBottom: 6,
      padding: 15,
      paddingTop: 20,
      flexBasis: 333,
      flexDirection: 'column',
      minHeight: 294,
    },
  },
  sessionTime: {
    main: {
      $web: {
        height: 'fit-content',
        fontFamily: 'Inter',
      },
      $native: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
      },
    },
    gridTileContent,
    gridRowContent,
    sessionTime: {
      main: {
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
  },
  labelList: {
    main: {
      $xsmall: {
        marginRight: 14,
        flex: 1,
      },
      $small: {
        marginRight: 0,
      },
    },
  },
}
