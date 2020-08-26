import React from 'react'
import { Helmet as ReactHelmet } from 'react-helmet'
import { checkCall, deepMerge, isArr, get, omitKeys, pickKeys, isObj } from '@svkeg/jsutils'
import { useHistory } from 'SVComponents/router'
import cssProperties from './cssProperties'

const getElementRefs = (customRefs={}) => {
  return deepMerge({
    link: [],
    meta: [],
    style: [],
    script: [],
  }, customRefs)
}


/**
 * Converts JS CSS rule into CSS string
 * @param  { object } rule - style as JS CSS
 * @return { string } rule convert into CSS string
 */
const createRules = rule => (
  Object
    .entries(rule)
    .reduce((ruleString, [ propName, propValue ]) => {
      const name = propName
        .replace(/([A-Z])/g, matches => `-${matches[0].toLowerCase()}`)

      const hasUnits = !cssProperties.noUnits[propName]
      const val = hasUnits && typeof propValue === 'number' && propValue + 'px' || propValue

      return `${ruleString}\n\t${name}: ${val};`
    }, '')
)

/**
 * Converts a block of JS CSS into CSS string
 * @param  { string } selector - CSS selector for the rules
 * @param  { object } rls - CSS rules to be converted into a string
 * @return
 */
const createBlock = (selector, rls) => {
  const subSelect = []
  const filteredRls = Object.keys(rls).reduce((filtered, key) => {
    if (typeof rls[key] !== 'object') filtered[key] = rls[key]
    else subSelect.push([ `${selector} ${key}`, rls[key] ])

    return filtered
  }, {})

  const styRls = createRules(filteredRls)
  let block = `${selector} {${styRls}\n}\n`
  subSelect.length && subSelect.map(subItem => block += createBlock(
    subItem[0],
    subItem[1]
  ))

  return block
}

  /**
  * Converts the JS styles into a css string
  * @param  { array of objects } rules - array of object styles to add convert into string
  * @return { string } styles objects converted into string as formatted css styles
  */
const convertJsToCss = rules => {
  console.log(`---------- rules ----------`)
  console.log(rules)
  
  return Object
    .entries(rules)
    .reduce((styles, [ selector, rls ]) => (styles + createBlock(selector, rls)), '')
}


const jsonToCss = style => {
  return Object.keys(style)
    .reduce((prev, curr) => {
      prev += curr.split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase()

      return `${prev}:${style[curr]};`
    }, '')
}

const getRefByType = (element, parsedRefs) => {
    switch (element.type) {
      case 'title': {
        parsedRefs.title = element.props.children || ''
        break
      }
      case 'style': {
        parsedRefs.style.push({
          cssText: element.props.children
        })
        break
      }
      case 'meta': {
        parsedRefs.meta.push(pickKeys(
          element.props,
          'name',
          'property',
          'content'
        ))
        break
      }
      case 'link': {
        parsedRefs.link.push(pickKeys(
          element.props,
          'rel',
          'href',
          'type',
          'as',
          'crossorigin',
          'media'
        ))
        break
      }
      case 'script': {
        script = omitKeys(element.props, 'children')
        element.props.type === 'application/ld+json' &&
          (script.innerHTML = element.props.children)

        parsedRefs.script.push(script)
        break
      }
    }

  return parsedRefs
}

const parseChildReferences = (children, customRefs) => {
  const elements = isArr(children) ? children : [children]

  return elements.reduce((parsedRefs, element) => {

    return isArr(element)
      ? parseChildReferences(element, parsedRefs)
      : element.type === React.Fragment
        ? parseChildReferences(element.props.children, parsedRefs)
        : getRefByType(element, parsedRefs)

  }, getElementRefs(customRefs))
}

const getLocationPath = () => {
  const history = useHistory()
  const pathname = get(history.location.pathname)

  return checkCall(pathname) || pathname
}

export const Helmet = ({ children, references, id, styles }) => {
  
  console.log(`---------- styles ----------`)
  console.log(styles)
  
  const childRefs = parseChildReferences(children, references)
  
  isObj(styles) && childRefs.style.unshift({ cssText: convertJsToCss(styles) })

  console.log(`---------- childRefs ----------`)
  console.log(childRefs.style)
  
  return (
    <ReactHelmet
      {...childRefs}
      keg={ id || getLocationPath() }
    />
  )
}

export const style = props => (<style type="text/css" {...props} />)
export const link = props => <link {...props} />
export const meta = props => <meta {...props} />
export const title = props => <title {...props} />
export const script = props => <script {...props} />
