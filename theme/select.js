import { padding, margin } from 'SVTheme/layout'

export const select = {
  container: {
    width: '100%',
  },
  wrapper: {
    width: '100%',
  },
  select: {
    $all: {
      minWidth: 250,
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderColor: '#e6e6e6',
      borderBottomColor: '#dddddd',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 5,
      marginBottom: margin.size,
      boxSizing: 'border-box',
      height: 35,
      padding: padding.size / 2,
    },
    $web: {
    },
    $native: {
      borderWidth: 2,
    }
  }
}
