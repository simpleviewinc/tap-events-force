import React, { useState, useCallback } from 'react'
import { View, Button, Drawer } from '@keg-hub/keg-components'
import ReactAce from 'react-ace-editor'

const convertJson = json => {
  return JSON.stringify(json, null, 2)
}

const aceRef = node => {
  if (!node || !node.editor) return
}

const Editor = ({ aceRef, onChange, value }) => {
  return (
    <ReactAce
      mode='json'
      theme='monokai'
      onChange={onChange}
      setValue={value}
      style={{ height: '500px', width: '100vw', fontSize: '16px' }}
      ref={aceRef}
    />
  )
}

export const TestData = ({ data, onSave }) => {
  const [ text, setText ] = useState(convertJson(data))

  const onChange = useCallback(
    update => {
      setText(update)
    },
    [ text, setText ]
  )

  const onEditorSave = useCallback(() => {
    try {
      onSave(JSON.parse(text))
    }
    catch (error) {
      console.log('json syntax error. check your test data')
    }
  }, [ onSave, text ])

  const [ toggled, setToggled ] = useState(false)

  return (
    <>
      <View style={styles.margin}>
        <Button
          themePath={`button.contained.${toggled ? 'danger' : 'secondary'}`}
          styles={styles.button}
          onClick={() => {
            setToggled(!toggled)
          }}
          content={`Test Data (JSON) - ${toggled ? 'Close' : 'Open'}`}
        />
      </View>
      <Drawer toggled={toggled}>
        <Editor
          value={text}
          onChange={onChange}
          aceRef={aceRef}
        />
        <Button
          themePath={'button.contained.primary'}
          styles={styles.button}
          onClick={onEditorSave}
          content={'Apply Changes'}
        />
      </Drawer>
    </>
  )
}

const styles = {
  button: {
    main: {
      width: 200,
      margin: 10,
    },
  },
  margin: {
    margin: 10,
  },
}
