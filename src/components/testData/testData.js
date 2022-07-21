import ReactAce from 'react-ace-editor'
import { exists, get, isObj } from '@keg-hub/jsutils'
import React, { useState, useCallback, useRef } from 'react'
import {
  View,
  Button,
  Drawer,
  Select,
  Label,
  Option,
} from '@old-keg-hub/keg-components'
import * as bookingStatesTestData from '../../mocks/eventsforce/bookingStates'
import defTestData from '../../mocks/eventsforce/testData.js'

const convertJson = json => {
  return JSON.stringify(json, null, 2)
}

const Editor = ({ aceRef, onChange, value }) => {
  return (
    <ReactAce
      mode='json'
      theme='monokai'
      onChange={onChange}
      setValue={value}
      style={{ height: '75vh', width: '100vw', fontSize: '16px' }}
      ref={aceRef}
    />
  )
}

const reduceBookingStates = (data, parentTypes, options) => {
  Object.entries(data).map(([ subParentType, items ]) => {
    const itemKeys = Object.keys(items)
    return itemKeys.includes('sessions') || itemKeys.includes('attendees')
      ? options.push(
          <Option
            key={`${parentTypes.label}-${subParentType}`}
            label={`${parentTypes.label}-${subParentType}`}
            value={`${parentTypes.value}.${subParentType}`}
          />
        )
      : isObj(items)
        ? reduceBookingStates(
            items,
            {
              label: parentTypes.label
                ? `${parentTypes.label}-${subParentType}`
                : subParentType,
              value: parentTypes.value
                ? `${parentTypes.value}.${subParentType}`
                : subParentType,
            },
            options
          )
        : (() => {
            throw new Error(
              `Dynamic Test Data must contain a sessions or attendees key`
            )
          })()
  })
}

const SelectBookingState = props => {
  const { onChange, aceRef } = props

  const onValueChange = useCallback(
    update => {
      const editor = aceRef?.current?.editor
      if (!update || !editor) return

      // Get and convert the object to a string
      const testData =
        update === 'N/A' ? defTestData : get(bookingStatesTestData, update)

      const strData = convertJson(testData)

      // Update the editor, and the locally stored state data
      // The Ace editor only allows setting the initial text data
      // So we have to call the ace editor API directly to update the text content
      editor.setValue(strData, -1)
      onChange(strData)
    },
    [ bookingStatesTestData, onChange, aceRef.current ]
  )

  const options = []
  reduceBookingStates(bookingStatesTestData, {}, options)

  return (
    <View>
      <Label>Booking State</Label>
      <Select
        styles={styles.select}
        onValueChange={onValueChange}
      >
        <Option
          label='N/A'
          value={''}
        />
        { options }
      </Select>
    </View>
  )
}

const BookingDelaySelect = ({ onValueChange }) => {
  return (
    <View>
      <Label>Booking Delay</Label>
      <Select
        styles={styles.select}
        onValueChange={onValueChange}
      >
        <Option
          label='N/A'
          value={'N/A'}
        />
        <Option
          label='Instant'
          value={0}
        />
        <Option
          label='1 second'
          value={1}
        />
        <Option
          label='3 seconds'
          value={3}
        />
        <Option
          label='10 seconds'
          value={10}
        />
        <Option
          label='Infinite'
          value={-1}
        />
      </Select>
    </View>
  )
}

export const TestData = ({ data, onSave }) => {
  const [ text, setText ] = useState(convertJson(data))
  const [ bookingDelay, setBookingDelay ] = useState('N/A')

  const onChange = useCallback(
    update => {
      exists(update) && setText(update)
    },
    [ text, setText ]
  )

  const onEditorSave = useCallback(() => {
    try {
      setToggled(!toggled)
      onSave(JSON.parse(text), { bookingDelay })
    }
    catch (error) {
      console.log('json syntax error. check your test data')
    }
  }, [ onSave, text, bookingDelay, toggled ])

  const aceRef = useRef(null)
  const [ toggled, setToggled ] = useState(false)

  return (
    <>
      <View style={styles.main}>
        <Button
          themePath={`button.contained.${toggled ? 'danger' : 'secondary'}`}
          styles={styles.button}
          onClick={() => {
            setToggled(!toggled)
          }}
          content={`Test Data (JSON) - ${toggled ? 'Close' : 'Open'}`}
        />
        { toggled && <SelectBookingState
          onChange={onChange}
          aceRef={aceRef}
        /> }
        { toggled && <BookingDelaySelect onValueChange={setBookingDelay} /> }
      </View>
      <Drawer toggled={toggled}>
        <Editor
          aceRef={aceRef}
          value={text}
          onChange={onChange}
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
  main: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  select: {
    select: {
      paddingRight: 35,
    },
  },
}
