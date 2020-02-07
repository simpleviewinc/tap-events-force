import { padding, margin } from 'SVTheme/layout'
export const app = {
  container: {
    $web: {
      ...padding(padding.size * 4),
      paddingTop: 150,
      minHeight: '100vh',
      overflow: 'hidden',
      maxWidth: '100%',
    },
    $all: {}
  }
}
