import { isArr } from '@svkeg/jsutils'

const classNames = [
  '.ef-sessions-text-default',
  '.ef-sessions-name',
  '.ef-sessions-details-header',
  '.ef-sessions-summary',
  '.ef-sessions-date-time',
  '.ef-sessions-location',
  '.ef-sessions-presenter',
  '.ef-sessions-location',
  '.ef-sessions-timeslot-header',
  '.ef-sessions-button-default',
  '.ef-sessions-button-primary',
  '.ef-sessions-ticket-type',
  '.ef-sessions-warning',
  '.ef-sessions-error',
]

/**
 * Checks if the application has access to the DOM
 * <br/>Ensures we don't call window in a non-web context
 */
const hasDomAccess = () => !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

/**
 * Appends the passed in styles to the DOM
 * @param {string} styles - Style to be added to the dom
 */
const addToDom = styles => {

  const dataCss = document.createElement('style')
  dataCss.type = 'text/css'

  // Based on the browser, we need to set the styles differently
  dataCss.styleSheet
    ? (dataCss.styleSheet.cssText = styles)
    : (dataCss.appendChild(document.createTextNode(styles)))

  // Add the styles to the dom
  document.getElementsByTagName("head")[0].appendChild(dataCss)

}

/**
 * Loops over the styles sheets currently on the DOM
 * <br/>Searches each one for a matching class within the passed in classNames
 * If it exists, then it converts it to `data-class-name` attribute
 * 
 * @param {Array} classNames - Array of className to convert into data-attributes
 */
export const parser = (classNames) => {
  if (!hasDomAccess()) return
  
  let updateStyleText = ''

  isArr(classNames) && 
    // Have to convert all styleSheets form the DOM into an array to loop over them
    Array.from(document.styleSheets)
      .map(sheet => {
        // Check the rules of each styleSheet for a matching class
        Array.from(sheet.cssRules).map(cssRule => {

          if (!cssRule.selectorText || !cssRule.cssText) return

          // Get the rootSelector of the cssRule, any sub-rule definitions will not work
          // Example
          // .my-class-name => WORKS
          // .root-class-name .my-class-name => DOES NOT WORK
          const rootSelector = cssRule.selectorText.split(' ').shift()
          if (!classNames.includes(rootSelector)) return

          // Convert to the data-class text from the rootSelector class
          // Example
          // .my-class-name => [data-class~="my-class-name"]
          const dataRule = cssRule.cssText.replace(rootSelector, `[data-class~="${rootSelector.substring(1)}"]`)

          updateStyleText += `${dataRule}\n`

        })
      })

  addToDom(updateStyleText)

}

parser(classNames)

