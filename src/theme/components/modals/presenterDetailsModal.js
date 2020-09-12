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
      $xsmall: {
        width: '90%',
        maxWidth: '800px',
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
            color: colors.lightGray,
            marginBottom: '5px',
            fontWeight: '500',
            fontSize: 18,
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
