export const sessionTime = {
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    margin: 0,
  },
  clockIcon: {
    size: 25,
    main: {
      $xsmall: {
        display: 'none',
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
      width: 0,
    },
    content: {
      $xsmall: {
        marginBottom: 2,
        color: '#8f908f',
      },
      $small: {
        color: 'black',
      },
    },
  },
}
