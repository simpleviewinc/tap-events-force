import { useMemo } from 'react'
import { useCss } from '@keg-hub/re-theme'
import { isStr } from '@keg-hub/jsutils'

export const useDataCss = (themeRef, style, id) => {
  const config = useMemo(() => {
    const idRef = id
      ? id
      : isStr(themeRef)
        ? themeRef
        : isObj(themeRef)
          ? Object.keys(themeRef).join('-')
          : undefined

    return {
      prefix: 'ef-',
      format: `[data-class~="{{ selector }}"]`,
      id: idRef,
    }
  }, [ id, themeRef ])

  return useCss(themeRef, style, config)
}
