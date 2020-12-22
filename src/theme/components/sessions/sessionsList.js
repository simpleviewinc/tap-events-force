import { colors } from '../../colors'

export const sessionsList = {
  main: {
    overscrollBehavior: 'contain',
  },
  content: {
    divider: {
      bgC: colors.dimTextGray,
      margin: 0,
      mB: 41,
    },
    hidden: {
      opacity: 0,
      maxH: 0,
      overflow: 'hidden',
    },
  },
}
