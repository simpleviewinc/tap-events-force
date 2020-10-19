import { colors } from '../../colors'

const smallImage = {
  width: 80,
  height: 80,
  overflow: 'hidden',
  borderRadius: 80 / 2,
  paddingBottom: 20,
}

export const presenterDetailsModal = {
  main: {},
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
    header: {
      content: {
        title: {
          $small: {
            fontSize: 22,
          },
        },
      },
    },
    body: {
      main: {
        flex: 1,
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
          $web: {
            $xsmall: {
              fontFamily: 'Inter',
              marginBottom: '5px',
            },
            $small: {
              lineHeight: '30px',
            },
          },
          $all: {
            $xsmall: {
              color: colors.lightGray,
              marginBottom: 5,
              fontWeight: '500',
              fontSize: 18,
            },
            $small: {
              lineHeight: 30,
              fontSize: 25,
            },
          },
        },
        company: {
          $web: {
            $xsmall: {
              fontFamily: 'Inter',
              lineHeight: '15px',
            },
            $small: {
              lineHeight: '19px',
            },
          },
          $all: {
            $xsmall: {
              fontWeight: '400',
              lineHeight: 15,
              fontSize: 12,
            },
            $small: {
              lineHeight: 19,
              fontSize: 16,
            },
          },
        },
      },
      row2: {
        main: {
          marginVertical: 25,
          minHeight: 50,
        },
        content: {
          main: {
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
              color: colors.lightGray,
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
