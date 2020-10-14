import * as SvgComponents from './elements'
import { TouchableOpacity } from 'react-native'
import { View } from '@keg-hub/keg-components'
import { mapEntries } from '@keg-hub/jsutils'
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Returns a wrapped version of the SVG Component. If the props
 * define onPress, then it uses TouchableOpacity, otherwise it wraps
 * it with a View.
 *
 * Accepts either `color`, `fill`, or the `style` object can color the icon
 * @param {Component} SvgElement - react-native-svg component
 * @returns {Component} wrapped - the wrapped component
 * @example
 *  const CloseIcon = buildIconComponent(svgCloseElement)
 *  <CloseIcon
 *    onPress={console.log}
 *    color={'#44AAAA'}
 *  />
 */
const buildIconComponent = SvgElement => {
  /**
   * Wrapped icon component - what consumers of EVFIcons will call
   * @param {Object} props
   * @param {Function?} props.onPress - on press callback. If defined, it will use a TouchableOpacity
   * @param {string?} props.fill - fill color of svg icon
   * @param {string?} props.color - alias for fill
   * @param {Object} ...remaining - all remaining props are passed to the SvgElement
   */
  const EVFIcon = props => {
    const { onPress, color, fill, ...svgProps } = props

    const Wrapper = onPress ? TouchableOpacity : View

    return (
      <Wrapper onPress={onPress}>
        <SvgElement
          fill={fill || color}
          {...svgProps}
        />
      </Wrapper>
    )
  }

  EVFIcon.propTypes = {
    onPress: PropTypes.func,
    fill: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    ...SvgElement.propTypes,
  }

  return EVFIcon
}

/**
 * Wraps and exports each element exported from `src/assets/icons/evf/elements/index.js`
 * @see `buildIconComponent` to see the wrapper
 * @see `src/assets/icons/evf/elements/index.js` for the available icon elements and their names
 * @example
 * import { EVFIcons } from 'SVIcons'
 * ...
 * const MyIconConsumer = props => {
 *   return (
 *     // 'Close' name comes from `src/assets/icons/evf/elements/close.js`
 *     <EVFIcons.Close
 *       onPress={console.log}
 *       style={{ height: 20 }}
 *       color={'#444AAA'}
 *       width={20}
 *     />
 *   )
 * }
 */
export const EVFIcons = mapEntries(SvgComponents, (name, component) => [
  name,
  buildIconComponent(component),
])
