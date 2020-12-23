import { colors } from '../../colors'
import { deepMerge } from '@keg-hub/jsutils'

const filterButtonDefault = {
  main: {
    pV: 8,
  },
  content: {
    $web: {
      ltrS: 0.1,
    },
    $all: {
      ftWt: '500',
      txDc: 'underline',
    },
  },
}
export const sessionsHeader = {
  main: {
    $all: {
      width: '100%',
      marginTop: 0,
      marginBottom: 10,
      backgroundColor: colors.transparent,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    $native: {
      height: 40,
      marginTop: 0,
      marginBottom: 20,
    },
  },
  container: {
    top: 0,
    position: 'sticky',
    zIndex: 1,
    backgroundColor: colors.white01,
  },
  content: {
    left: {
      main: {
        $native: {
          display: 'none',
        },
      },
    },
    center: {
      $native: {
        main: {
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        },
      },
    },
    right: {
      main: {},
      content: {
        main: {
          $xsmall: {
            jtC: 'flex-end',
            flD: 'row',
          },
          $small: {
            pR: 40,
          },
        },
        clearAll: deepMerge(filterButtonDefault, {
          main: {
            $xsmall: {
              display: 'none',
            },
            $small: {
              display: 'flex',
            },
          },
          content: {
            $all: {
              ftSz: 16,
              color: colors.lightGray01,
            },
          },
        }),
        filterIcon: {
          main: {
            jtC: 'center',
          },
          icon: {
            $xsmall: {
              color: colors.black,
              paddingRight: 5,
              height: 21,
              width: 32,
            },
            $small: {
              paddingRight: 10,
            },
          },
        },
        filterButton: deepMerge(filterButtonDefault, {
          content: {
            $all: {
              ftSz: 20,
              color: colors.black,
            },
          },
        }),
      },
    },
  },
}
