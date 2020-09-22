import { colors } from '../colors'
export const testContainer = {
  $web: {
    main: {
      $xsmall: {
        flex: 1,
        backgroundColor: colors.white01,
        padding: 20,
        width: '100vw',
      },
    },
    content: {
      heading: {
        paddingTop: 20,
      },
      button: {
        main: { marginTop: 10 },
      },
      evfButtons: {
        main: {
          flexDirection: 'row',
        },
        button: {
          main: {
            minHeight: 45,
            marginTop: 10,
            marginRight: 10,
            maxWidth: 150,
          },
        },
      },
    },
  },
}
