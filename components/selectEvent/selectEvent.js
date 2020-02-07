import React, { useState, useEffect } from 'react'
import { Picker } from 'react-native'
import { View, P } from 'SVComponents'
import { useTheme } from 're-theme'
import { Values } from 'SVConstants'
import { useCollection } from 'SVUtils/hooks'

const { events: eventsCat } = Values.categories

const buildEvents = events => {
  return Object.keys(events).map(key => {
    const event = events[key]
    return (
      <Picker.Item key={key} value={ key } label={ event.eventName } />
    )
  })
}

const Select = props => {
  const { setEvent, event, items, theme } = props

  return (
    <View
      style={theme.get(
        'select.wrapper'
      )}
    >
      <Picker
        style={theme.get(
          'select.select',
        )}
      >
        { buildEvents(items) }
      </Picker>
    </View>
  )
}

export const SelectEvent = props => {

  const theme = useTheme()
  const events = useCollection(eventsCat)

  const { event: propsEvent } = props
  const [ event, setEvent ] = useState(propsEvent)
  
  useEffect(() => {
    !event && setEvent(propsEvent)
  }, [ propsEvent ])
  

  return (
    <View
      style={theme.get(
        'select.container',
        'display.content.center',
        { width: '100%', maxHeight: 300 }
      )}
    >
      <P style={{ marginBottom: 5, width: '100%' }} >Select Event</P>
      <Select
        items={ events }
        event={ event }
        setEvent={ setEvent }
        theme={ theme }
      />
    </View>
  )

}
