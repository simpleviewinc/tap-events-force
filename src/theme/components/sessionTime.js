export const sessionTime = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    margin: 0,
  },
  clockIcon: {
    main: {
      $xsmall: {
        display: 'none',
        width: 19,
        height: 20,
      },
      $small: {
        display: 'flex',
        marginRight: 5,
      },
    },
  },
  timeText: {
    main: {
      flexBasis: 200,
    },
    content: {
      $xsmall: {
        display: 'flex',
        flex: 1,
        color: '#8f908f',
      },
      $small: {
        color: 'black',
      },
    },
  },
}
