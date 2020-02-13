import React, { useState } from 'react'
import { View } from 'react-native'
import { useTheme } from 're-theme'
import { get }  from 'jsutils'
import { QRScanner } from 'SVComponents/qr' 
import { Modal } from 'SVComponents/modal'

/**
 * QRContainer
 * @param {Object} props 
 */
const QRContainer = props => {
  const theme = useTheme()
  const [ qr, setQR ] = useState('')
  const [ showModal, setShowModal ] = useState(false)

  const onScanFound = (result) => {
    setQR(result)
    result && setShowModal(true)
  }

  return (
    <View
      style={ theme.join(
        get(theme, [ 'app', 'container' ]),
        get(props, [ 'styles', 'container' ]),
      )}
    >
      <Modal 
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        title='Scanner Results'
        text={qr}
      />

      <QRScanner onScan={onScanFound} />
    </View>
  )
}

export default QRContainer
