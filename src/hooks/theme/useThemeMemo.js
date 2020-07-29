import { useMemo } from 'react'

/**
 * @param {Object} theme - theme object
 * @param {String} themePath - path to theme file, relative to the theme folder
 * @param {Array<Object>} customStyles  - optional custom styles to override ones at the path
 * @param {Array} dependencies  - optional custom dependencies that dictate when the hook recomputes the theme.
 *                                By default, when this is falsy, it recomputes when any of the other input values change it recomputes when of the other arguments change
 * @returns {Object} - the combined theme result joining the theme at themePath and customStyles, memoized
 */
export const useThemeMemo = (
  theme,
  themePath,
  customStyles,
  dependencies = null
) => {
  const memoDependencies = dependencies || [ theme, themePath, customStyles ]
  return useMemo(
    () => theme.join(theme.get(themePath), customStyles),
    memoDependencies
  )
}
