import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native'
import { View, P, Subtitle } from 'SVComponents'
import { useTheme } from 're-theme'

const EmailDisplay = props => {
  const { email, theme } = props
  return (
    <View
      style={theme.get(
        'email.wrapper',
        { minHeight: 40, marginBottom: 5 },
      )}
    >
      <Subtitle>
        { email ? 'Your email address is' : 'Please enter your email' }
      </Subtitle>
      <P style={ theme.get('', { fontWeight: '700' }) } >
        { email }
      </P>
    </View>
  )
}

const EmailInput = props => {
  const { setEmail, email, theme } = props

  return (
    <TextInput
      style={theme.get(
        'email.textField',
      )}
      onChangeText={setEmail}
      value={ email || '' }
    />
  )
}

export const Email = props => {

  const theme = useTheme()

  const { email: propsEmail } = props
  const [ email, setEmail ] = useState(propsEmail)
  
  useEffect(() => {
    !email && setEmail(propsEmail)
  }, [ propsEmail ])
  
  return (
    <View
      style={theme.join(
        'email.container',
        'display.content.left',
        { alignItems: 'flex-start', width: '100%' }
      )}
    >
      <EmailDisplay email={ email } theme={ theme } />
      <EmailInput email={ email } setEmail={ setEmail } theme={ theme } />
    </View>
  )

}
