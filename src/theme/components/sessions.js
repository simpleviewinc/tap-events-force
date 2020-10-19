import { colors } from '../colors'
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
            $web: {
              // maxWidth: '10%',
            },
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
          main: {
            $xsmall: {
              // maxWidth: '10%',
            },
          },
          content: {
            main: {
              $xsmall: {
                flexDirection: 'row',
              },
              $small: {
                pR: 40,
              },
            },
            clearAll: {
              main: {
                jtC: 'flex-end',
              },
              content: {
                $web: {
                  ltrS: 0.1,
                },
                $all: {
                  ftSz: 16,
                  ftWt: '500',
                  txDc: 'underline',
                  color: colors.lightGray01,
                },
              },
            },
            filterIcon: {
              main: {
                jtC: 'center',
              },
              icon: {
                $xsmall: {
                  color: colors.black,
                  paddingRight: 5,
                },
                $small: {
                  paddingRight: 10,
                },
              },
            },
            filterButton: {
              main: {
                pV: 8,
                pH: 12,
              },
              content: {
                $web: {
                  letterSpacing: 0.1,
                },
                $all: {
                  fontSize: 20,
                  fontWeight: '500',
                  textDecorationLine: 'underline',
                  color: colors.black,
                },
              },
            },
          },
        },
      },
    },
  },
}
