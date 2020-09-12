import { colors } from '../../colors'
import { defaultTextStyle } from './baseModal'

const defaultLabelStyle = {
  main: {
    marginTop: 8,
    marginRight: 8,
  },
  content: {},
}

const stateButtonsSelected = {
  main: {
    backgroundColor: colors.lightGray,
  },
  content: {
    color: colors.white02,
  },
}

const stateButtonsUnselected = {
  main: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.lightGray,
  },
  content: {
    color: colors.lightGray,
  },
}

const defaultUnselectedStyle = {
  main: {
    ...stateButtonsUnselected.main,
    opacity: 1,
  },
  content: stateButtonsUnselected.content,
}

const stateButton = {
  selected: {
    default: stateButtonsSelected,
    hover: stateButtonsSelected,
    active: stateButtonsSelected,
  },
  unselected: {
    default: defaultUnselectedStyle,
    hover: defaultUnselectedStyle,
    active: defaultUnselectedStyle,
  },
}

const buttonsWrapper = {
  flexDirection: 'row',
  alignContent: 'flex-start',
  flexWrap: 'wrap',
  height: 'fit-content',
  maxWidth: '100%',
  flexBasis: 'auto',
}

export const filterModal = {
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
            leftText: defaultTextStyle,
          },
        },
        middleSection: {
          main: {
            height: 200, // TODO: PLACEHOLDER
          },
          content: {
            labelButtons: {
              main: {
                $web: {
                  ...buttonsWrapper,
                  paddingBottom: 25,
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
            stateButtons: {
              main: {
                $web: buttonsWrapper,
              },
              content: {
                item: {
                  $web: stateButton,
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
}
