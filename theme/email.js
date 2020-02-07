import { padding, margin } from 'SVTheme/layout'
import { colors } from 'SVTheme/colors'

export const email = {
  container: {
    ...padding.all,
  },
  textField: {
    $all: {
      minWidth: 100,
      backgroundColor: '#FFFFFF',
      borderColor: '#e6e6e6',
      borderBottomColor: '#dddddd',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 5,
      marginBottom: margin.size,
    },
    $web: {
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      height: 35,
      maxWidth: 300,
      fontSize: 16,
      padding: padding.size / 2,
    },
    $native: {
      borderWidth: 2,
    }
  }
}
