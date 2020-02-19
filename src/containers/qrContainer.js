import React, { useState } from 'react'
import { View } from 'react-native'
import { useTheme } from 're-theme'
import { get }  from 'jsutils'
import { QRScanner } from 'SVComponents/qr' 
import { Button } from 'SVComponents/button' 
import { ConfirmModal } from 'SVComponents/modal'
import { navigateBack } from 'SVActions/navigation/navigateBack'
import { Loading } from 'keg-components'

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

  const onScanResultConfirmed = () => setShowModal(false)

  // shows a message to try again. Only used with the QRImageReader
  const showRetryModal = () => onScanResult('Could not decode the image. Please try again!')

  return (
    <View
      style={ theme.join(
        get(props, [ 'styles', 'container' ]),
        get(theme, [ 'qr', 'container']),
        { width: theme.RTMeta.width }
      )}
    >
      <Button 
        style={theme.navigation.button}
        onPress={navigateBack}>
        Back
      </Button>

      <ConfirmModal 
        visible={showModal}
        onDismiss={onScanResultConfirmed}
        title='Scanner Results'
        text={scanResult}
      />

      <QRScanner 
        style={theme.qr.scannerView}
        videoStyle={theme.qr.video}
        inputStyle={theme.qr.input}
        onScanStart={() => setScanning(true)}
        onScanStop={() => setScanning(false)}
        onScanFail={showRetryModal}
        onScan={onScanResult} 
        scanOnInit
      />

      { !showModal && scanning && <Loading style={theme.qr.loader} /> }

    </View>
  )
}

