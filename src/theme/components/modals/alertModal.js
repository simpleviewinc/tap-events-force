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
      textContainer: {
        main: {
          $xsmall: {
            maxHeight: 250,
            marginBottom: 10,
          },
          $small: {
            maxHeight: 500,
          },
        },
        contentContainer: {
          padding: 10,
        },
      },
      text: {
        $xsmall: {
          fontSize: '14px',
        },
        $small: {
          fontSize: '16px',
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
}
