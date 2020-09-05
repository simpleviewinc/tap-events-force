import { colors } from './colors'

export const typography = {
  font: {
    family: {
      $native: {},
      $web: {
        fontFamily: 'Inter, Verdana, Geneva, sans-serif',
      },
    },
  },
  default: {
    fontStyle: 'normal',
    color: colors.black,
    lineHeight: '22px',
  },
}
