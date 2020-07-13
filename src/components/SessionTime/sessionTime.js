import React from 'react'
import { View } from 'react-native'
import { Icon, Text, useThemePath } from 'SVComponents'
import { FontAwesome5 } from '@expo/vector-icons'
import { useTheme } from '@simpleviewinc/re-theme'

/**
 *
 * @param {object} props
 */
export const SessionTime = props => {
  const { start, end } = props
  const theme = useTheme()
  console.log(start)
  console.log(theme)
  console.log(useThemePath)
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'yellow',
        alignItems: 'center',
      }}
    >
      <Icon
        type={'sessionTime'}
        Element={FontAwesome5} // Q: need to be able to redefine default font element for when we get the evf .ttf
        name={'clock'}
        size={35}
      />
      <Text style={{ paddingLeft: 10 }}>
        { start } - { end }
      </Text>
    </View>
  )
}
