import { colors } from '../../colors'

export const sessionsList = {
  main: {},
  content: {
    section: {
      main: {
        margin: 0,
        mT: 0,
        mB: 40,
      },
      divider: {
        margin: 0,
        bgC: colors.dimTextGray,
      },
    },
    list: {
      /**
      * Sets a default height for the list bottom padding
      * This gets overwritten later within the component
      */
      marginBottom: 300
    }
  },
}
