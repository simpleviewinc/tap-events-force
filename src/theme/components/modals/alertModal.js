export const alertModal = {
  main: {},
  content: {
    main: {
      $web: {
        $xsmall: {
          maxWidth: '600px',
        },
      },
      $all: {
        $xsmall: {
          minHeight: 200,
          width: '80%',
          maxWidth: 600,
        },
      },
    },
    header: {
      content: {
        title: {
          $web: {
            $xsmall: {
              letterSpacing: '0.105em',
            },
          },
          $all: {
            $xsmall: {
              letterSpacing: 0.105,
            },
            $small: {},
          },
        },
      },
    },
    body: {
      main: {
        paddingHorizontal: 22,
        paddingVertical: 26,
      },
      content: {
        text: {
          $web: {
            fontSize: '16px',
          },
          $all: {
            fontSize: 16,
            paddingBottom: 10,
          },
        },
        button: {
          main: {
            alignSelf: 'flex-end',
            width: 87,
            height: 45,
          },
        },
      },
    },
  },
}
