import { colors } from '../../colors'
import { defaultTextStyle } from './baseModal'

const buttonMargin = {
  marginTop: 8,
  marginRight: 8,
}

const stateButtonsSelected = {
  main: {
    backgroundColor: colors.lightGray,
    ...buttonMargin,
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
    ...buttonMargin,
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

const labelButtonSelected = {
  default: {
    main: buttonMargin,
  },
  hover: {
    main: buttonMargin,
  },
  active: {
    main: buttonMargin,
  },
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

const labelButton = {
  selected: labelButtonSelected,
  unselected: labelButtonSelected,
}

const buttonsWrapper = {
  flexDirection: 'row',
  alignContent: 'flex-start',
  flexWrap: 'wrap',
  height: 'fit-content',
  maxWidth: '100%',
  flexBasis: 'auto',
  paddingBottom: 60,
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
        labelButtons: {
          main: {
            $web: buttonsWrapper,
          },
          item: {
            $web: labelButton,
          },
        },
        stateButtons: {
          main: {
            $web: buttonsWrapper,
          },
          item: {
            $web: stateButton,
          },
        },
      },
      bottomSection: {
        main: {
          alignItems: 'flex-end',
        },
        button: {
          main: {
            width: 87,
            height: 45,
          },
        },
      },
    },
  },
}
