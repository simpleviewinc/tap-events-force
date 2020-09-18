import { useMemo } from 'react'
import { getParsedClasses } from '../theme/dynamicClassMap'

export const useParsedStyle = className => {
  return useMemo(() => {
    const { classList } = getParsedClasses()
    return classList[className]
  }, [className])
}
