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
          paddingLeft: 18,
          paddingRight: 16,
          paddingTop: 7,

          // allows for both overflow-scrolling AND dynamic flex sizing
          flexShrink: 'unset',
        },
        $small: {
          paddingLeft: 46,
          paddingRight: 36,
          paddingTop: 17,
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
        },
        bottomSection: {
          main: {
            $xsmall: {
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignSelf: 'flex-end',
              paddingTop: 26,
              paddingBottom: 36,
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
