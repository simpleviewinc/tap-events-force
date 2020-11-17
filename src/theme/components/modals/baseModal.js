import { colors } from '../../colors'

export const defaultTextStyle = {
  fontWeight: '600',
  fontSize: 16,
}

export const baseModal = {
  main: {},
  content: {
    main: {
      $web: {
        $xsmall: {
          maxWidth: '650px',
        },
      },
      $all: {
        $xsmall: {
          width: '90%',
          maxWidth: 650,
        },
      },
    },
    header: {
      main: {
        flexDirection: 'row',
      },
      content: {
        title: {
          $xsmall: {
            alignSelf: 'center',
            color: colors.white,
            paddingRight: 16,
            fontSize: 17,
            fontWeight: '600',
            lineHeight: 27,
          },
          $small: {
            fontSize: 18,
            paddingRight: 30,
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
