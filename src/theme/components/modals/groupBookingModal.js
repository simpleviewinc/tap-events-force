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
            infoText: {
              ...groupBookingTextStyle,
              color: colors.lightGray,
              textAlign: 'end',
            },
          },
        },
        middleSection: {
          main: {
            display: 'flex',
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
          main: {
            $xsmall: {
              minHeight: 45,
              marginRight: 10,
              maxWidth: 120,
            },
            $small: {
              minWidth: 120,
            },
          },
        },
        bookButton: {
          main: {
            $xsmall: {
              minHeight: 45,
            },
            $small: {
              minWidth: 190,
            },
          },
        },
      },
    },
  },
}
