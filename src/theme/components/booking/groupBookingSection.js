import { colors } from 'SVTheme/colors'

export const groupBookingSection = {
  main: {
    marginBottom: 11,
  },
  content: {
    header: {
      $all: {
        width: '70%',

        color: colors.lightGray,

        fontWeight: '600',
        fontSize: 16,
        lineHeight: 19,

        padding: 2,
        paddingBottom: 12,

        marginBottom: 7,
        marginLeft: 31,

        borderBottomWidth: 1,
        borderStyle: 'dotted',
        borderColor: '#909090',
      },
      $web: {
        letterSpacing: '0.105em',
      },
    },
    item: {
      main: {
        marginBottom: 19,
      },
    },
    unnamedItem: {
      main: {
        fontStyle: 'italic',
      },
    },
  },
}
