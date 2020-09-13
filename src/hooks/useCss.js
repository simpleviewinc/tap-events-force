import { useMemo } from 'react'
import { useCss as useReCss } from '@keg-hub/re-theme'
import { isStr, isObj } from '@keg-hub/jsutils'

export const useCss = (themeRef, style, id) => {
  const config = useMemo(() => {
    const idRef = id
      ? id
      : isStr(themeRef)
        ? themeRef
        : isObj(themeRef)
          ? Object.keys(themeRef).join('-')
          : undefined

    return {
      // inline: true,
      propKey: 'className',
      format: `.{{ selector }}`,
      convention: 'css',
      id: idRef,
    }
  }, [ id, themeRef ])

  return useReCss(themeRef, style, config)
}
