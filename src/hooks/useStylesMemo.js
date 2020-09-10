import { useMemo } from 'react'
import { useTheme } from '@keg-hub/re-theme'

const noOpObj = {
  content: {},
}

export const useStylesMemo = (path, ...styles) => {
  const theme = useTheme()
  return useMemo(() => theme.get(path, ...styles) || noOpObj, [
    theme,
    path,
    ...styles,
  ])
}
