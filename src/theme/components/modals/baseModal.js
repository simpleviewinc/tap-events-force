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
    bodyWrapper: {
      $xsmall: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 12,
      },
      $small: {
        paddingHorizontal: 40,
        paddingVertical: 25,
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
            paddingLeft: 18,
            paddingRight: 16,
            fontSize: 17,
            fontWeight: '600',
            lineHeight: 27,
          },
          $small: {
            fontSize: 18,
            paddingLeft: 40,
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
