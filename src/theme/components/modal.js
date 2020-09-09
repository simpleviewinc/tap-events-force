import { colors } from '../colors'

const smallImage = {
  width: 80,
  height: 80,
  overflow: 'hidden',
  borderRadius: 80 / 2,
  paddingBottom: 20,
}

const defaultInstructionStyle = {
  fontWeight: '600',
  fontSize: '16px',
}

const defaultLabelStyle = {
  main: {
    marginTop: 8,
    marginRight: 8,
  },
  content: {},
}

export const modal = {
  base: {
    main: {},
    content: {
      main: {
        $xsmall: {
          width: '90%',
          maxWidth: '650px',
        },
      },
      header: {
        main: {
          flexDirection: 'row',
          height: 72,
          backgroundColor: colors.primary,
        },
        content: {
          title: {
            $xsmall: {
              alignSelf: 'center',
              color: colors.white,
              paddingLeft: 46,
              paddingRight: 30,
              fontWeight: 600,
              fontSize: 18,
              lineHeight: 27,
            },
          },
          closeButton: {
            main: {
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
              flex: 1,
              padding: 10,
              right: '4%',
            },
            content: {},
          },
        },
      },
    },
  },
  groupBooking: {
    content: {
      main: {
        $xsmall: {
          width: '90%',
          maxWidth: '800px',
        },
      },
      body: {
        main: {
          flexDirection: 'column',
          paddingLeft: 46,
          paddingRight: 36,
          paddingTop: 17,
        },
        content: {
          topSection: {
            main: {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            content: {
              instructionText: defaultInstructionStyle,
              infoText: {
                ...defaultInstructionStyle,
                color: colors.lightGray,
                textAlign: 'end',
              },
            },
          },
          middleSection: {},
          bottomSection: {
            main: {
              $xsmall: {
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingTop: 26,
                paddingBottom: 35,
              },
            },
            content: {
              cancelButton: {
                main: {
                  minHeight: 45,
                  maxWidth: 120,
                  marginRight: 10,
                },
              },
              bookButton: {
                main: {
                  minHeight: 45,
                  maxWidth: 190,
                },
              },
            },
          },
        },
      },
    },
  },
  presenter: {
    main: {},
    content: {
      main: {
        $xsmall: {
          width: '90%',
          maxWidth: '800px',
        },
      },
      header: {
        content: {
          title: {
            $small: {
              fontSize: 22,
            },
          },
        },
      },
      body: {
        main: {
          flex: 1,
          paddingHorizontal: 40,
          paddingVertical: 25,
        },
        row1: {
          smallImage,
          container: {
            flexDirection: 'row',
          },
          details: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 30,
            flexShrink: 1,
          },
          image: {
            $xsmall: smallImage,
            $small: {
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
            },
          },
          title: {
            $xsmall: {
              fontFamily: 'Inter',
              color: colors.lightGray,
              marginBottom: '5px',
              fontWeight: '500',
              fontSize: 18,
            },
            $small: {
              lineHeight: '30px',
              fontSize: 25,
            },
          },
          company: {
            $xsmall: {
              fontFamily: 'Inter',
              fontWeight: '400',
              lineHeight: '15px',
              fontSize: 12,
            },
            $small: {
              lineHeight: '19px',
              fontSize: 16,
            },
          },
        },
        row2: {
          main: {
            marginVertical: 25,
            minHeight: 50,
          },
          content: {
            main: {
              $xsmall: {
                maxHeight: 250,
              },
              $small: {
                maxHeight: 450,
              },
            },
            biography: {
              $xsmall: {
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 'normal',
                color: colors.lightGray,
                fontSize: 12,
                lineHeight: 18,
              },
              $small: {
                fontSize: 16,
                lineHeight: 22,
              },
            },
          },
        },
      },
    },
  },
  error: {
    content: {
      main: {
        $xsmall: {
          minHeight: 200,
          width: '80%',
          maxWidth: '600px',
        },
      },
      header: {
        content: {
          title: {
            $xsmall: {
              letterSpacing: '0.105em',
            },
            $small: {},
          },
        },
      },
      body: {
        main: {
          paddingHorizontal: 22,
          paddingVertical: 26,
        },
        content: {
          text: {
            fontSize: '16px',
            paddingBottom: 10,
          },
          button: {
            main: {
              alignSelf: 'flex-end',
              width: 87,
              height: 45,
            },
          },
        },
      },
    },
  },
  filter: {
    content: {
      main: {},
      header: {
        content: {
          title: {
            $small: {
              fontSize: 22,
            },
          },
        },
      },
      body: {
        main: {
          paddingLeft: 46,
          paddingRight: 26,
          paddingTop: 17,
          paddingBottom: 26,
        },
        content: {
          topSection: {
            main: {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            content: {
              instructionText: defaultInstructionStyle,
            },
          },
          middleSection: {
            main: {
              height: 200, // TODO: PLACEHOLDER
            },
            content: {
              labelList: {
                main: {
                  $web: {
                    flexDirection: 'row',
                    alignContent: 'flex-start',
                    flexWrap: 'wrap',
                    height: 'fit-content',
                    maxWidth: '100%',
                    flexBasis: 'auto',
                  },
                },
                content: {
                  item: {
                    $web: {
                      default: defaultLabelStyle,
                      hover: defaultLabelStyle,
                      active: defaultLabelStyle,
                    },
                  },
                },
              },
            },
          },
          bottomSection: {
            main: {
              alignItems: 'flex-end',
            },
            content: {
              button: {
                main: {
                  width: 87,
                  height: 45,
                },
              },
            },
          },
        },
      },
    },
  },
}
