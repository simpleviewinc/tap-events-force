import React, { useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 're-theme'
import { get }  from 'jsutils'
import { QRScanner } from 'SVComponents/qr' 
import { Button } from 'keg-components'
import { ConfirmModal } from 'SVComponents/modal'
import { ResultBox } from 'SVComponents/box'
import { navigateBack } from 'SVActions/navigation/navigateBack'
import { useSelector } from 'react-redux'
import { upsertScan, upsertScanError } from 'SVActions'
import { Values } from 'SVConstants'

/**
 * QRContainer
 * @param {Object} props 
 */
export const QRContainer = props => {
  const theme = useTheme()

  const [ scanning, setScanning ] = useState(true)
  const [ errMessage, setErrMessage ] = useState(null)

  const scanResult = useSelector(({items}) => items[Values.categories.qr].scanResult)

  // qr scanner callbacks
  const onScanResultFound = useCallback((result) => result && upsertScan(result), [])
  const onErrorConfirmed = useCallback(() => setErrMessage(null), [])
  const onScanStart = useCallback(() => setScanning(true))
  const onScanStop = useCallback(() => setScanning(false))
  const onScanFail = useCallback((err) => {
    upsertScanError(err)
    setScanning(false)
    setErrMessage('Could not decode from image. Please try again!')
  }, [])


  return (
    <View
      style={ theme.join(
        get(props, [ 'styles', 'container' ]),
        get(theme, [ 'qr', 'container']),
      )}
    >
      <View style={theme.get('navigation.button')}>
        <Button onPress={navigateBack}>
          Back
        </Button>
      </View>

      { /* notifies user of failed scan */ }
      <ConfirmModal 
        visible={!!errMessage}
        onDismiss={onErrorConfirmed}
        title='Scan Failed'
        text={errMessage}
      />

      <QRScanner 
        style={theme.get('qr.scannerView')}
        videoStyle={theme.get('qr.video')}
        inputStyle={theme.get('qr.input')}
        onScanStart={onScanStart}
        onScanStop={onScanStop}
        onScanFail={onScanFail}
        onScan={onScanResultFound} 
        scanOnInit
      />

      <ResultBox
        title={'Decoded QR Code:'}
        text={scanResult}
      />
      
      { scanning && 
          <Text style={{ margin: 15, opacity: 0.7 }}>
            Scanning...
          </Text> 
      }

    </View>
  )
}
