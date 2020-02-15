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
export const QRContainer = props => {
  const theme = useTheme()

  const [ scanResult, setScanResult ] = useState(null)
  const [ scanning, setScanning ] = useState(false)
  const [ showModal, setShowModal ] = useState(false)

  const onScanResult = (result) => {
    setScanResult(result)
    result && setShowModal(true)
  }

  // shows a message to try again. Only used with the QRImageReader
  const showRetryModal = () => onScanResult('Could not decode the image. Please try again!')

  return (
    <View
      style={ theme.join(
        get(theme, [ 'app', 'container' ]),
        get(props, [ 'styles', 'container' ]),
        get(theme, [ 'qr', 'container'])
      )}
    >
      { showModal && <View style={ get(theme, [ 'mask', 'dimmed'])} /> }

      <Modal 
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        title='Scanner Results'
        text={scanResult}
      />

      <QRScanner 
        style={theme.qr.scannerView}
        videoStyle={theme.qr.video}
        inputStyle={theme.qr.input}
        onScanStart={_ => setScanning(true)}
        onScanFail={showRetryModal}
        onScan={onScanResult} 
      />

      <p>{ !showModal && scanning && "Loading..."}</p>
    </View>
  )
}

