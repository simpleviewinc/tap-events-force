import { colors } from 'SVTheme/colors'

export const groupBookingSection = {
  main: {
    marginBottom: 11,
  },
  content: {
    header: {
      $all: {
        $xsmall: {
          width: '70%',
          color: colors.lightGray,
          fontWeight: '600',
          lineHeight: 19,
          padding: 1,
          paddingBottom: 6,
          marginBottom: 4,
          marginLeft: 27,
          borderBottomWidth: 1,
          borderStyle: 'dotted',
          borderColor: '#909090',
          fontSize: 14,
        },
        $small: {
          fontSize: 16,
          padding: 2,
          paddingBottom: 12,
          marginBottom: 7,
        },
      },
      $web: {
        letterSpacing: '0.105em',
      },
    },
    item: {
      main: {
        $xsmall: {
          fontSize: '0.8em',
        },
        $small: {
          fontSize: 'inherit',
        },
      },
    },
    unnamedItem: {
      main: {
        fontStyle: 'italic',
      },
    },
  },
}
