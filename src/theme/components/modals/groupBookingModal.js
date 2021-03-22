import { colors } from '../../colors'

const groupBookingTextStyle = {
  $xsmall: {
    fontWeight: '600',
    fontSize: '0.8em',
  },
  $small: {
    fontSize: '1em',
  },
}

export const groupBookingModal = {
  content: {
    body: {
      main: {
        $xsmall: {
          flexDirection: 'column',
          flexShrink: 'unset',
        },
      },
      content: {
        topSection: {
          main: {
            $xsmall: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
              flex: 1,
            },
            $small: {
              marginBottom: 'inherit',
            },
          },
          content: {
            instructionText: groupBookingTextStyle,
            instructionAsterisk: {
              color: colors.red,
            },
            infoText: {
              ...groupBookingTextStyle,
              color: colors.lightGray,
              textAlign: 'end',
            },
          },
        },
        middleSection: {
          main: {
            flex: 9,
          },
          section: {
            header: {
              ...groupBookingTextStyle,
              color: colors.lightGray,
            },
          },
        },
      },
    },
    footer: {
      main: {
        $xsmall: {
          fl: 1,
          flD: 'row',
          jtC: 'flex-end',
        },
      },
      content: {
        cancelButton: {
          container: {
            $xsmall: {
              marginRight: 10,
            },
          },
        },
        bookButton: {},
      },
    },
  },
}
