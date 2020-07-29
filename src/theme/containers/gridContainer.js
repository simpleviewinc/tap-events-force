export const gridContainer = {
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    header: {
      main: {
        backgroundColor: '#4F4F4F',
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
    items: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
  },
}
