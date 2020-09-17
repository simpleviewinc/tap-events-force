import { colors } from '../../colors'
import { defaultTextStyle } from './baseModal'

export const groupBookingModal = {
  content: {
    main: {
      $xsmall: {
        width: '90%',
        maxWidth: '800px',
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
              justifyContent: 'flex-end',
              paddingTop: 26,
              paddingBottom: 35,
            },
          },
          content: {
            cancelButton: {
              main: {
                minHeight: 45,
                maxWidth: 120,
                marginRight: 10,
              },
            },
            bookButton: {
              main: {
                minHeight: 45,
                maxWidth: 190,
              },
            },
          },
        },
      },
    },
  },
}
