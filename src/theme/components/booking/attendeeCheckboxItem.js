import { colors } from '../../colors'

const text = {
  $xsmall: {
    fontSize: '0.8em',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    overflow: 'visible',
  },
  $small: {
    fontSize: 'inherit',
  },
}

export const attendeeCheckboxItem = {
  main: {},
  waitingItem: {
    main: {
      $xsmall: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10,
        flexWrap: 'wrap',
      },
      $small: {
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
      },
    },
    textWrapper: {
      flexDirection: 'column',
      flexShrink: 1,
      pR: 10,
    },
    text,
    waitBox: {
      main: {
        $web: {
          minHeight: 31,
          backgroundColor: 'unset',
          cursor: 'default',
          borderRadius: 2,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: colors.second,
          width: 100,
          height: 31,
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
      content: {
        color: colors.second,
        fontSize: 12,
        fontWeight: 500,
      },
    },
  },
}
