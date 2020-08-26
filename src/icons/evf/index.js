import * as SvgComponents from './elements'
import { TouchableOpacity } from 'react-native'
import { View } from '@svkeg/keg-components'
import { mapEntries } from '@svkeg/jsutils'
import React from 'react'

/**
 * Returns a wrapped version of the SVG Component. If the props
 * define onPress, then it uses TouchableOpacity, otherwise it wraps
 * it with a View.
 *
 * Accepts dataSet, and either `color`, `fill`, or the `style` object can color the icon
 * @param {Component} SvgElement - react-native-svg component
 * @returns {Component} wrapped - the wrapped component
 * @example
 *  const CloseIcon = buildIconComponent(null, svgCloseElement)
 *  <CloseIcon
 *    onPress={console.log}
 *    color={'#44AAAA'}
 *  />
 */
const buildIconComponent = SvgElement => {
  /**
   * Wrapped component
   * @param {Object} props
   * @param {Object?} props.dataSet - the dataSet to be passed to View or TouchableOpacity
   * @param {Function?} props.onPress - on press callback. If defined, it will use a TouchableOpacity
   * @param {string?} props.fill - fill color of svg icon
   * @param {string?} props.color - alias for fill
   * @param {Object} ...remaining - all remaining props are passed to the SvgElement
   */
  return props => {
    const { dataSet, onPress, color, fill, ...svgProps } = props

    const Wrapper = onPress ? TouchableOpacity : View

    return (
      <Wrapper
        dataSet={dataSet}
        onPress={onPress}
      >
        <SvgElement
          fill={fill || color || 'none'}
          {...svgProps}
        />
      </Wrapper>
    )
  }
}

const IconComponents = mapEntries(SvgComponents, (name, component) => [
  name,
  buildIconComponent(component),
])

export const EVFIcons = { ...IconComponents }
