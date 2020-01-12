import { padding, margin } from 'SVTheme/layout'
import { colors } from 'SVTheme/colors'

export const chat = {
  input: {
    container: {
      position: 'absolute',
      width: '100vw',
      top: 'calc( 100vh - 100px)',
      backgroundColor: colors.lightGray,
      flexDirection: 'row',
      borderTopStyle: 'solid',
      borderTopWidth: 2,
      borderTopColor: colors.divider,
      ...padding(20),
    },
    wrapper: {
      width: 'calc( 100% - 165px)',
      backgroundColor: colors.white,
      ...margin.right,
    },
    textField: {
      wrapper: {
        ...padding.vert,
      },
      field: {}
    },
    button: {
      width: 150,
      height: 56
    }
  },
}