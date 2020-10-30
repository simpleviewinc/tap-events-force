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
    main: {
      $xsmall: {
        $web: {
          width: '90%',
          maxWidth: '800px',
          flex: 1,
        },
      },
    },
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
        bottomSection: {
          main: {
            $xsmall: {
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignSelf: 'flex-end',
              paddingTop: 14,
              paddingBottom: 18,
            },
            $small: {
              paddingTop: 26,
              paddingBottom: 0,
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
    },
  },
}
