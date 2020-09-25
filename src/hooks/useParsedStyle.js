import { useMemo } from 'react'
import { isObj } from '@keg-hub/jsutils'
import { getParsedClasses } from '../theme/dynamicClassMap'

/**
 * Gets the parsed cssInJs styles from the dynamicClassMap parsing
 * @function
 * @param {string} className - Name of the class who's styles should be returned
 * 
 * @returns {Object} - Parsed styles for the passed in className
 */
export const useParsedStyle = className => {
  return useMemo(() => {
    const { classList } = getParsedClasses()
    return isObj(classList) && classList[className]
  }, [className])
}
