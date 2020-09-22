import { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'

const noOpObj = {
  content: {},
}

export const useStylesMemo = (...styleArgs) => {
  const theme = useTheme()
  return useMemo(() => theme.get(...styleArgs) || noOpObj, [
    theme,
    ...styleArgs,
  ])
}
