import { colors } from '../../colors'

export const defaultTextStyle = {
  fontWeight: '600',
  fontSize: '16px',
}

export const baseModal = {
  main: {},
  content: {
    main: {
      $xsmall: {
        width: '90%',
        maxWidth: '650px',
      },
    },
    header: {
      main: {
        flexDirection: 'row',
        height: 72,
        backgroundColor: colors.primary,
      },
      content: {
        title: {
          $xsmall: {
            alignSelf: 'center',
            color: colors.white,
            paddingLeft: 46,
            paddingRight: 30,
            fontWeight: 600,
            fontSize: 18,
            lineHeight: 27,
          },
        },
        closeButton: {
          main: {
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
            flex: 1,
            padding: 10,
            right: '4%',
          },
          content: {},
        },
      },
    },
  },
}
