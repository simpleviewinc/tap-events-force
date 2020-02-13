import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 're-theme'
import { get }  from 'jsutils'
import { QRScanner } from 'SVComponents/qr' 

const textStyle = {
  fontWeight: 'bold',
  fontSize: 20,
  marginLeft: 50
}

/**
 * QRContainer
 * @param {Object} props 
 */
const QRContainer = props => {
  const theme = useTheme()
  const [ qr, setQR ] = useState('')
  const [ scanning, setScanning ] = useState(false)

  const onScanStart = () => {
    setQR(null)
    setScanning(true)
  }

  const onScanFound = (result) => {
    setScanning(false)
    setQR(result)
  }

  return (
    <View
      style={ theme.join(
        get(theme, [ 'app', 'container' ]),
        get(props, [ 'styles', 'container' ]),
      )}
    >
      <QRScanner 
        onScan={onScanFound} 
        onScanStart={onScanStart}
      />
      <Text style={textStyle}>
        { scanning
          ? 'Scanning...'
          : qr
        }
      </Text>
    </View>
  )
}

export default QRContainer
