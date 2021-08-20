const text = {
  $xsmall: {
    fontSize: '0.8em',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    overflow: 'visible',
  },
  $small: {
    fontSize: 'inherit',
  },
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
        flexWrap: 'wrap',
      },
      $small: {
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
      },
    },
    text,
  },
}
