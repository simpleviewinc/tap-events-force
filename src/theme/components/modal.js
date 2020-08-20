import { text } from './text'

const smallImage = {
  width: 80,
  height: 80,
  overflow: 'hidden',
  borderRadius: 80 / 2,
  paddingBottom: 20,
}

const groupBookingTextStyle = {
  ...text,
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '22px',
}

export const modal = {
  base: {
    main: {},
    content: {
      main: {},
      header: {
        main: {
          flexDirection: 'row',
          height: 72,
          backgroundColor: '#22B3C4',
        },
        content: {
          title: {
            $xsmall: {
              ...text,
              alignSelf: 'center',
              color: 'white',
              paddingLeft: 46,
              paddingRight: 30,
              fontWeight: '500',
              fontSize: 22,
              lineHeight: 27,
            },
            $small: {},
          },
          closeButton: {
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
            flex: 1,
            padding: 10,
            right: '4%',
          },
        },
      },
      body: {
        main: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
  groupBooking: {
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
        },
        content: {
          topSection: {
            main: {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            content: {
              instructionText: groupBookingTextStyle,
              infoText: {
                ...groupBookingTextStyle,
                color: '#A0A0A0',
              },
            },
          },
          middleSection: {},
          bottomSection: {},
        },
      },
    },
  },
  presenter: {
    main: {},
    backdrop: {},
    modal: {
      content: {
        $xsmall: {
          maxWidth: '90%',
        },
        $medium: {
          maxWidth: '500px',
        },
        $large: {
          maxWidth: '800px',
        },
      },
      header: {
        main: {
          flexDirection: 'row',
          height: 72,
          // TODO: placeholder until we know how the passed down css/styling will work
          backgroundColor: '#22B3C4',
        },
        title: {
          $xsmall: {
            fontFamily: 'Inter',
            alignSelf: 'center',
            color: 'white',
            paddingLeft: 46,
            paddingRight: 30,
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 22,
            lineHeight: 27,
          },
          $small: {},
        },
        closeButton: {
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          flex: 1,
          padding: 10,
          right: '4%',
        },
      },
      body: {
        main: {
          flex: 1,
          paddingHorizontal: 40,
          paddingVertical: 25,
        },
        row1: {
          smallImage,
          container: {
            flexDirection: 'row',
          },
          details: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 30,
            flexShrink: 1,
          },
          image: {
            $xsmall: smallImage,
            $small: {
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
            },
          },
          title: {
            $xsmall: {
              fontFamily: 'Inter',
              color: '#A0A0A0',
              marginBottom: '5px',
              fontWeight: '500',
              fontSize: 18,
              // TODO: update placeholder color
            },
            $small: {
              lineHeight: '30px',
              fontSize: 25,
            },
          },
          company: {
            $xsmall: {
              fontFamily: 'Inter',
              fontWeight: '400',
              lineHeight: '15px',
              fontSize: 12,
            },
            $small: {
              lineHeight: '19px',
              fontSize: 16,
            },
          },
        },
        row2: {
          container: {
            marginVertical: 25,
            minHeight: 50,
          },
          content: {
            $xsmall: {
              maxHeight: 250,
            },
            $small: {
              maxHeight: 450,
            },
          },
          biography: {
            $xsmall: {
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: '#909090',
              fontSize: 12,
              lineHeight: 18,
            },
            $small: {
              fontSize: 16,
              lineHeight: 22,
            },
          },
        },
      },
    },
  },
}
