import { colors } from '../../colors'
import { defaultTextStyle } from './baseModal'

export const groupBookingModal = {
  content: {
    main: {
      $web: {
        $xsmall: {
          maxWidth: '800px',
        },
      },
      $all: {
        $xsmall: {
          width: '90%',
          maxWidth: 800,
        },
      },
    },
    body: {
      main: {
        flexDirection: 'column',
        paddingLeft: 46,
        paddingRight: 36,
        paddingTop: 17,
      },
      content: {
        topSection: {
          main: {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
          content: {
            instructionText: defaultTextStyle,
            infoText: {
              ...defaultTextStyle,
              color: colors.lightGray,
              textAlign: 'end',
            },
          },
        },
        middleSection: {},
        bottomSection: {
          main: {
            $xsmall: {
              flexDirection: 'row',
              alignSelf: 'flex-end',
              paddingTop: 26,
              paddingBottom: 35,
              flex: 1,
            },
          },
          content: {
            cancelButton: {
              main: {
                $xsmall: {
                  minHeight: 45,
                  marginRight: 10,
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
