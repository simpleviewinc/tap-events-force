import { colors } from 'SVTheme/colors'
import { padding, margin } from 'SVTheme/layout'

export const messages = {
  container: {
    backgroundColor: colors.lightGray,
    paddingTop: padding.size,
    ...padding(padding.size, [ 'left', 'right' ]),
  },
  list: {
    backgroundColor: colors.white,
    padding: padding.size / 4,
    paddingBottom: padding.size * 6,
  },
  wrapper: {
    
  },
  message: {
    fromItem: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    toItem: {
      
    },
    container: {
      borderRadius: 5,
      minWidth: 150,
      padding: padding.size / 2,
    },
    toContainer: {
      backgroundColor: colors.lightBlue,
    },
    fromContainer: {
      backgroundColor: colors.secondary.light,
    },
    wrapper: {},
    title: {
      fontWeight: '700',
      textAlign: 'left',
      fontSize: 12
    },
    divider: {
      marginTop: margin.size / 3,
      marginBottom: margin.size,
    },
    content: {
      ...padding(padding.size / 2, [ 'bottom', 'left', 'right' ]),
      textAlign: 'left',
      fontSize: 16,
    },
    fromContent: {
      color: colors.black,
    },
    toContent: {
      color: colors.white,
    }
  }
}
