export const gridTileContent = {
  main: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    marginRight: 12,
  },
  row1: {
    main: {
      flexDirection: 'row',
    },
    price: {
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: 19,
    },
  },
  buttonSection: {
    main: {
      $web: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end',
      },
    },
    bookingButton: {
      main: {
        height: 50,
      },
      content: {
        button: {
          main: {},
        },
      },
    },
  },
}
