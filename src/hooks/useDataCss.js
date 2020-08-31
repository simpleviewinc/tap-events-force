import { useMemo } from 'react'
import { useCss } from '@svkeg/re-theme'
import { isStr } from '@svkeg/jsutils'
import { Style } from '@svkeg/re-theme/head'


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
      selector: `[data-class~="{{ selector }}"]`,
      id: idRef
    }
  }, [ id, themeRef ])

  return useCss(themeRef, style, config)
}