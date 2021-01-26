import { colors } from '../colors'

export const gridContainer = {
  $web: {
    main: {
      $xsmall: {
        justifyContent: 'center',
      },
      $small: {
        paddingTop: 40,
      },
    },
    content: {
      header: {
        main: {
          backgroundColor: colors.darkGray,
          $xsmall: {
            maxHeight: 30,
            overflow: 'hidden',
            width: null,
            maxWidth: '100%',
          },
          $small: {
            maxHeight: 50,
            marginHorizontal: 3,
          },
        },
        content: {
          left: {
            main: {
              fl: 1,
              jsC: 'flex-start',
              maxW: '50%',
            },
            content: {
              text: {
                $web: {
                  fontFamily: 'Inter',
                },
                $all: {
                  color: colors.white,
                  ftWt: '600',
                  pL: 21,
                  ftSz: 20,
                  ftS: 'normal',
                },
              },
            },
          },
          right: {},
          center: {},
        },
      },
      items: {
        $xsmall: {
          flexWrap: 'wrap',
          flexDirection: 'column',
        },
        $small: {
          flexDirection: 'row',
        },
      },
    },
  },
}
