import { colors } from '../colors'
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

export const sessions = {
  main: {
    $web: {
      width: '100vw',
      flex: 1,
      overflowX: 'hidden',
      maxWidth: '100%',
    },
    $native: {
      flexDirection: 'column',
      width: '100%',
    },
    $all: {
      $xsmall: {
        backgroundColor: colors.white01,
        padding: 20,
      },
      $small: {
        padding: 50,
      },
    },
  },
  content: {
    header: {
      main: {
        $all: {
          width: '100%',
          marginVertical: 20,
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
    },
  },
}
