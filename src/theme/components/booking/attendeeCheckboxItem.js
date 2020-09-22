const text = {
  $xsmall: {
    fontSize: '0.8em',
  },
  $small: {
    fontSize: 'inherit',
  },
  overflow: 'visible',
}

export const attendeeCheckboxItem = {
  main: {},
  waitingItem: {
    main: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      $xsmall: {
        justifyContent: 'flex-start',
      },
      $small: {
        justifyContent: 'space-between',
      },
      marginLeft: 10,
    },
    textWrapper: {
      flexDirection: 'row',
    },
    text,
    waitText: {
      ...text,
      fontStyle: 'italic',
      marginLeft: 4,
    },
    button: {
      main: {
        $web: {
          cursor: 'default',
          borderRadius: 2,
          borderColor: 'gray',
          width: 100,
          height: 31,
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
      content: {
        fontSize: 12,
        fontWeight: 500,
      },
    },
  },
}
