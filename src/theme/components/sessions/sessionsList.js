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
            mT: 15,
            mB: 30,
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
            mB: 5,
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
            mT: 5,
            mB: 15,
          },
          $small: {
            mT: 0,
            mB: 0,
          },
        },
        divider: {
          display: 'none',
        }
      },
      empty: {
        main: {
          $xsmall: {
            mT: 15,
            mB: 30,
          },
          $small: {
            mT: 34,
            mB: 6,
          },
        },
        text: {
          $xsmall: {
            mB: 30,
          },
        },
      },
      mobile: {
        divider: {
          bgC: 'transparent',
        }
      },
      lastEmpty: {
        main: {
          mB: 100,
        },
        text: {
          mB: 30,
        },
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
