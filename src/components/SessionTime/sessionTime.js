import React from 'react'
import { View } from 'react-native'
import { Icon, Text } from 'SVComponents'
import { FontAwesome5 } from '@expo/vector-icons'
import { useTheme } from '@simpleviewinc/re-theme'
import moment from 'moment'

const textStyle = { paddingLeft: 10 }
/**
 *
 * @param {object} props
 * @param {string} props.start - ex: 2020-08-03 13:00:00
 * @param {string} props.end - ex: 2020-08-03 13:30:00
 */
export const SessionTime = props => {
  const { start, end } = props
  const theme = useTheme()
  console.log(theme)
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'yellow',
        alignItems: 'center',
      }}
    >
      { /* wrap this in evfIcon so we can use custom ttf when it comes */ }
      <Icon
        type={'sessionTime'}
        Element={FontAwesome5}
        name={'clock'}
        size={35}
      />
      <Text style={textStyle}>
        { `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}` }
      </Text>
    </View>
  )
}

// theme

// const theme = {
//   sessionTime: {
//     main: {
//       flex: 1,
//       flexDirection: 'row',
//       backgroundColor: 'yellow',
//       alignItems: 'center',
//     }
//   }

// }
