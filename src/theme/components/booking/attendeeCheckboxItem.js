import { colors } from 'SVTheme/colors'
import { deepMerge } from '@keg-hub/jsutils'

const defaultStyles = {
  main: {},
  content: { right: {} },
}

const disabledStyles = deepMerge(defaultStyles, {
  main: {
    opacity: 0.5,
  },
  content: {
    right: {
      color: colors.dimTextGray,
    },
  },
})

export const attendeeCheckboxItem = {
  default: defaultStyles,
  disabled: disabledStyles,
}
