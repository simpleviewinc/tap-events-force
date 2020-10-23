import { colors } from '../../colors'
import { defaultTextStyle } from './baseModal'

const buttonMargin = {
  marginTop: 8,
  marginRight: 8,
}

const stateButtonsBorder = {
  borderWidth: 1,
  borderColor: colors.lightGray,
}

const stateButtonsSelected = {
  main: {
    backgroundColor: colors.lightGray,
    ...stateButtonsBorder,
    ...buttonMargin,
  },
  content: {
    color: colors.white02,
  },
}

const stateButtonsUnselected = {
  main: {
    backgroundColor: colors.white,
    ...stateButtonsBorder,
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
  $web: {
    height: 'fit-content',
  },
  $native: {
    alignSelf: 'flex-start',
  },
  $all: {
    $xsmall: {
      flexDirection: 'row',
      alignContent: 'flex-start',
      flexWrap: 'wrap',
      maxWidth: '100%',
      flexBasis: 'auto',
      paddingBottom: 20,
    },
    $small: {
      paddingBottom: 60,
    },
  },
}

const clearButtonDefault = {
  main: {
    jtC: 'center',
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
      main: {},
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
          flex: 1,
          paddingTop: 15,
        },
        container: {
          $xsmall: {
            maxHeight: 250,
          },
          $small: {
            maxHeight: 550,
          },
        },
        labelButtons: {
          main: buttonsWrapper,
          item: labelButton,
        },
        stateButtons: {
          main: buttonsWrapper,
          item: stateButton,
        },
      },
      bottomSection: {
        main: {
          flD: 'row',
          alS: 'flex-end',
          fl: 1,
          flWr: 'wrap',
        },
        applyButton: {
          main: {
            minHeight: 45,
            mL: 15,
          },
        },
        clearButton: clearButtonDefault,
      },
    },
  },
}
