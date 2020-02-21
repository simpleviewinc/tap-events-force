import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 're-theme'
import { get }  from 'jsutils'
import { QRScanner } from 'SVComponents/qr' 
import { Button } from 'keg-components'
import { ConfirmModal } from 'SVComponents/modal'
import { navigateBack } from 'SVActions/navigation/navigateBack'
import { Loading } from 'keg-components'
import { useSelector } from 'react-redux'
import { upsertScan } from 'SVActions'
import { Values } from 'SVConstants'

/**
 * QRContainer
 * @param {Object} props 
 */
export const QRContainer = props => {
  const theme = useTheme()

  const [ scanning, setScanning ] = useState(false)
  const [ err, setErr ] = useState(null)

  const scanResult = useSelector(({items}) => items[Values.categories.qr].scanResult)

  const onScanResult = (result) => {
    result && upsertScan(result)
  }

  // shows a message to try again. Only used with the QRImageReader
  const onScanFail = (err) => setErr('Could not decode an image. Please try again!')
  const onErrorConfirmed = () => setErr(null)

  return (
    <View
      style={ theme.join(
        get(props, [ 'styles', 'container' ]),
        get(theme, [ 'qr', 'container']),
        { width: theme.RTMeta.width }
      )}
    >
      <View style={theme.navigation.button}>
        <Button onPress={navigateBack}>
          Back
        </Button>
      </View>

      { /* notifies user of failed scan */ }
      <ConfirmModal 
        visible={!!err}
        onDismiss={onErrorConfirmed}
        title='Scan Failed'
        text={err}
      />

      <QRScanner 
        style={theme.qr.scannerView}
        videoStyle={theme.qr.video}
        inputStyle={theme.qr.input}
        onScanStart={() => setScanning(true)}
        onScanStop={() => setScanning(false)}
        onScanFail={onScanFail}
        onScan={onScanResult} 
        scanOnInit
      />

      {/* { scanning && <Loading style={theme.qr.loader} /> } */}

      <ResultBox
        text={scanResult}
        title={'Decoded QR Code:'}
      />

    </View>
  )
}

const ResultBox = ({text='', title=''}) => {
  const theme = useTheme()
  return (
    <View>
      <Text style={theme.get('qr.resultTitle')}>{title}</Text>
      <TextBox text={text} />
    </View>
  )
}

const TextBox = ({text}) => {
  const theme = useTheme()
  return (
    <View style={theme.get('qr.resultBox')}>
      <Text style={theme.get('qr.resultText')}>
        { text || '' }
      </Text>
    </View>
  )
}
  
