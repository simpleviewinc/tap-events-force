export const sessions = {
  $web: {
    main: {
      $xsmall: {
        flex: 1,
        backgroundColor: '#F3F3F3',
        padding: 20,
        width: '100vw',
      },
      $small: {
        padding: 50,
      },
    },
    content: {
      header: {
        main: {
          width: '100%',
          marginVertical: 20,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          justifyContent: 'center',
        },
        content: {
          left: {},
          center: {},
          right: {
            filterIcon: {
              color: 'black',
            },
            filterButton: {
              main: {
                marginRight: 40,
              },
              content: {
                fontSize: 20,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textDecorationLine: 'underline',
                color: 'black',
              },
            },
          },
        },
      },
    },
  },
}
