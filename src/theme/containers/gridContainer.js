export const gridContainer = {
  main: {
    flex: 1,
  },
  content: {
    header: {
      main: {
        backgroundColor: '#4F4F4F',
        $xsmall: {
          maxHeight: 30,
        },
        $small: {
          maxHeight: 50,
        },
      },
      content: {
        left: {
          main: {
            flex: 1,
            justifyContent: 'center',
          },
          content: {
            text: {
              color: 'white',
              fontFamily: 'Inter',
              fontWeight: '600',
              paddingLeft: 10,
              fontSize: 20,
              fontStyle: 'normal',
            },
          },
        },
        right: {},
        center: {},
      },
    },
  },
}
