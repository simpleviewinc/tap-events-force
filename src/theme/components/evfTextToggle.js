import { colors } from '../colors'

export const evfTextToggle = {
  textToggle: {
    main: {},
    text: {
      ftSz: 14,
      ftWt: '400',
      lnH: 22,
      color: colors.darkGray02
    }
  },
  customToggle: {
    main: {
      flexDirection: 'row'
    },
    text: {
      textDecorationLine: 'underline',
      fontWeight: '500', 
      lineHeight: 27,
      fontSize: 16
    },
    icon: {
      container: {
        justifyContent: 'center',
        paddingLeft: 10
      }, 
      icon: {
        fontSize: 16
      }
    }
  }
}