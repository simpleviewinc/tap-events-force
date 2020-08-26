export const sessionTime = {
  $web: {
    main: {
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
        width: 0,
      },
      content: {
        $xsmall: {
          color: '#8f908f',
        },
        $small: {
          color: 'black',
        },
      },
    },
  },
}
