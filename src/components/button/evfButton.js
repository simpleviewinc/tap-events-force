import * as React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { View } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'
import Svg, { Path, G } from 'react-native-svg'

/**
 * EvfButton.web
 * @param {object} props - props to override the svg props
 * @param {Function} props.onPress
 * @param {('default'|'primary'| null)} props.type - button type. uses 'default' if not used
 * @param {string} props.text
 */
export const EvfButton = props => {
  const { onPress, styles, type = 'default', text } = props
  const theme = useTheme()

  const buttonStyles = theme.join(theme.get(`button.evfButton.${type}`), styles)
  console.log({ buttonStyles })

  return (
    <TouchableOpacity
      style={buttonStyles.main}
      onPress={onPress}
      dataSet={EvfButton.dataSet.main}
    >
      <SvgComponent
        styles={buttonStyles}
        text={text}
      />
    </TouchableOpacity>
  )
}

/**
 * converted from assets/svg/evfButton.svg with some modification to make it work properly
 * @param {object} props
 * @param {string} props.styles - styles obj to apply to svg component
 * @param {string} props.text - text to display
 */
const SvgComponent = ({ styles, text }) => {
  const { main: mainStyles, content: contentStyles } = styles

  return (
    <Svg
      style={contentStyles.svg?.main}
      width={mainStyles.width}
      height={mainStyles.height}
    >
      <G>
        { /* 
          carve out the path for the btn shape with dynamic sizes
          path is taken from mockup with minor updates
         */ }
        <Path
          d={`M${mainStyles.width} ${mainStyles.height}V0H18L1 18.5V${mainStyles.height}h${mainStyles.width}z`}
        />
        { /* inject react component for text here */ }
        <foreignObject
          width={'100%'}
          height={'100%'}
        >
          <View
            style={contentStyles.svg?.content?.textView?.main}
            dataSet={EvfButton.dataSet.content.textView.main}
          >
            <Text
              dataSet={EvfButton.dataSet.content.textView.content}
              style={contentStyles.svg?.content?.textView?.content}
              numberOfLines={1}
            >
              { text }
            </Text>
          </View>
        </foreignObject>
      </G>
    </Svg>
  )
}

EvfButton.dataSet = {
  main: { class: 'evf-button-main' },
  content: {
    textView: {
      main: { class: 'evf-button-content-textView-main' },
      content: { class: 'evf-button-content-textView-content' },
    },
  },
}
