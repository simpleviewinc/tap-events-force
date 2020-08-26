import * as SvgComponents from './elements'
import { TouchableOpacity } from 'react-native'
import { View } from '@svkeg/keg-components'
import { mapEntries } from '@svkeg/jsutils'
import React from 'react'
import PropTypes from 'prop-types'

/**
 * Returns a wrapped version of the SVG Component. If the props
 * define onPress, then it uses TouchableOpacity, otherwise it wraps
 * it with a View.
 *
 * Accepts dataSet, and either `color`, `fill`, or the `style` object can color the icon
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
   * @param {Object?} props.dataSet - the dataSet to be passed to View or TouchableOpacity
   * @param {Function?} props.onPress - on press callback. If defined, it will use a TouchableOpacity
   * @param {string?} props.fill - fill color of svg icon
   * @param {string?} props.color - alias for fill
   * @param {Object} ...remaining - all remaining props are passed to the SvgElement
   */
  const EVFIcon = props => {
    const { dataSet, onPress, color, fill, ...svgProps } = props

    const Wrapper = onPress ? TouchableOpacity : View

    return (
      <Wrapper
        dataSet={dataSet}
        onPress={onPress}
      >
        <SvgElement
          fill={fill || color}
          {...svgProps}
        />
      </Wrapper>
    )
  }

  EVFIcon.propTypes = {
    dataSet: PropTypes.object,
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
 * @see `src/assets/icons/evf/svg/*` for the source svg files used to create the elements
 * @example
 * import { EVFIcons } from 'SVIcons'
 * ...
 * const MyIconConsumer = props => {
 *   return (
 *     // 'Close' name comes from `src/assets/icons/evf/elements/close.js`
 *     <EVFIcons.Close
 *       dataSet={{ $class: 'close-icon' }}
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
