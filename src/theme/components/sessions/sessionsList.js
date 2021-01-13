import { get } from '@keg-hub/jsutils'
import { colors } from '../../colors'
import { dayToggle } from '../dates/dayToggle'

export const sessionsList = {
  main: {},
  content: {
    dividers: {
      standard: {
        main: {
          $xsmall: {
            margin: 0,
            mT: 5,
            mB: 20,
          },
          $small: {
            mT: 34,
            mB: 0,
          },
        },
        text: dayToggle?.content?.text,
        divider: {
          margin: 0,
          bgC: colors.dimTextGray,
        }
      },
      hidden: {
        main: {
          display: 'none'
        }
      },
      first: {
        main: {
          $xsmall: {
            mT: 0,
            mB: 20,
          },
          $small: {
            mB: 0,
          },
        },
        divider: {
          bgC: 'transparent',
        }
      },
      firstEmpty: {
        main: {
          $xsmall: {
            mT: 15,
            mB: 15,
          },
          $small: {
            mT: 40,
          },
        },
      },
      empty: {
        main: {
          $xsmall: {
            mT: 25,
            mB: 15,
          },
          $small: {
            mT: 34,
          },
        },
        divider: {
        }
      },
      mobile: {
        divider: {
          bgC: 'transparent',
        }
      }
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
