import { colors } from '../../colors'

export const sessionsList = {
  main: {},
  content: {
    section: {
      main: {
        $xsmall: {
          margin: 0,
          mT: 26,
          mB: 41,
        },
        $small: {
          mT: 41,
          mB: 6,
        },
      },
      empty: {},
      hidden: {
        display: 'none',
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
