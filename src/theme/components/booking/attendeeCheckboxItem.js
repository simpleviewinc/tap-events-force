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
      $xsmall: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10,
      },
      $small: {
        justifyContent: 'space-between',
      },
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
          minHeight: 31,
          backgroundColor: 'unset',
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
