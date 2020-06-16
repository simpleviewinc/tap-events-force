import React, { useState } from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { get }  from 'jsutils'
import { QRScanner } from 'SVComponents/qr' 
import { View, Button } from 'SVComponents'
import { Modal } from 'SVComponents/modal'
import { navigateBack } from 'SVActions/navigation/navigateBack'

/**
 * QRContainer
 * @param {Object} props
 */
export const QRContainer = props => {
  const theme = useTheme()
  const [ scanResult, setScanResult ] = useState('')
  const [ showModal, setShowModal ] = useState(false)

  const onScanFound = result => {
    setScanResult(result)
    result && setShowModal(true)
  }

  const modalText = `"${scanResult}"`

  return (
    <View
      style={theme.join(
        get(theme, [ 'app', 'container' ]),
        get(props, [ 'styles', 'container' ])
      )}
    >
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        title='Scanner Results'
        text={modalText}
      />

      <QRScanner onScan={onScanFound} />

      <Button onPress={navigateBack}>Back</Button>
    </View>
  )
}
