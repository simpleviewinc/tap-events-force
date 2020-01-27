import { padding, margin } from 'SVTheme/layout'
import { colors } from 'SVTheme/colors'

export const write = {
  input: {
    container: {
      position: 'absolute',
      backgroundColor: colors.lightGray,
      flexDirection: 'row',
      ...padding.vert,
      paddingTop: padding.size,
      paddingBottom: padding.size * 4,
      width: '100%',
      top: '90%',
    },
    wrapper: {
      backgroundColor: colors.white,
      marginRight: margin.size / 2,
      flexGrow: 2,
      borderRadius: 5,
    },
    textField: {
      wrapper: {
        marginTop: 0,
      },
      field: {
        paddingTop: 0,
      },
    },
    button: {
      height: 56,
      flexGrow: 1,
      padding: 0,
    },
    buttonText: {
      color: colors.white,
    }
  },
}
