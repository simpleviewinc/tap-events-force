import React, { useEffect, useState } from 'react'
import { Button, Section, H6, H5, Divider, View } from 'SVComponents'
import { useTheme } from '@keg-hub/re-theme'
import testData from '../mocks/eventsforce/testData.json'
import { mapSessionInterface } from 'SVActions'
import { RenderModals } from 'SVComponents/modals'
import { Values } from 'SVConstants'
import { useCreateModal } from 'SVHooks/modal'
import { useSelector } from 'react-redux'
import { withAppHeader } from 'SVComponents'
import { useKegEvent } from 'SVHooks/events'
import { isNative } from 'SVUtils/platform/isNative'

const { EVENTS } = Values
const marginStyle = {
  margin: 10,
}
const buttonStyles = {
  main: {
    width: 200,
    ...marginStyle,
  },
}
/**
 * for testing purposes only
 * @todo - remove later
 * @param {string} text
 */
const applyJson = (text, setMockData) => {
  try {
    setMockData(JSON.parse(text))
  }
  catch (error) {
    console.log('json syntax error. check your test data')
  }
}

const testOnSessionBookingRequest = (session, attendees) => {
  console.log(attendees)
  console.log(session)
}

/**
 * TestContainer to be used by QA to test out individual component
 */
export const TestContainer = withAppHeader('Test Container', props => {
  const [ text, setText ] = useState(JSON.stringify(testData, null, 2))
  const [ mockData, setMockData ] = useState(JSON.parse(text))

  // map the evf props onto our states
  useEffect(() => void mapSessionInterface(mockData), [mockData])
  return (
    <View>
      { !isNative() && process.env.NODE_ENV === 'development' && (
        <>
          <H5 style={marginStyle}>Test Data (JSON)</H5>
          <textarea
            style={marginStyle}
            rows={5}
            value={text}
            onChange={event => setText(event.target.value)}
          />
          <Button
            themePath={'button.contained.primary'}
            styles={buttonStyles}
            onClick={() => applyJson(text, setMockData)}
            content={'Apply'}
          />
        </>
      ) }
      <ModalDemos />
    </View>
  )
})

export const ModalDemos = () => {
  const theme = useTheme()
  const testStyles = theme.get('testContainer')
  const store = useSelector(state => state.items)

  // set up our event listener for booking request
  useKegEvent(EVENTS.SESSION_BOOKING_REQUEST, testOnSessionBookingRequest)

  return (
    <View style={testStyles.main}>
      <Section>
        <H5>Modals</H5>
        <Divider />
        <H6 style={testStyles.content.heading}>Presenter Details</H6>
        <Button
          themePath='button.contained.primary'
          styles={testStyles.content.button}
          onClick={useCreateModal(
            Values.MODAL_TYPES.PRESENTER,
            store.presenters[0]
          )}
          content={'Presenter 1 (image + short bio)'}
        />
        <Button
          styles={testStyles.content.button}
          themePath='button.contained.primary'
          onClick={useCreateModal(
            Values.MODAL_TYPES.PRESENTER,
            store.presenters[1]
          )}
          content={'Presenter 2 (no image, no bio)'}
        />
        <Button
          themePath='button.contained.primary'
          styles={testStyles.content.button}
          onClick={useCreateModal(
            Values.MODAL_TYPES.PRESENTER,
            store.presenters[2]
          )}
          content={'Presenter 3 (long bio text)'}
        />

        <H6 style={testStyles.content.heading}>Group Bookings</H6>
        <Button
          themePath='button.contained.secondary'
          styles={testStyles.content.button}
          onClick={useCreateModal(Values.MODAL_TYPES.GROUP_BOOKING, {
            session: store.sessions[1],
            attendees: store.attendees,
          })}
          content={'Group booking Demo 1 - unlimited spots'}
        />

        <Button
          themePath='button.contained.secondary'
          styles={testStyles.content.button}
          onClick={useCreateModal(Values.MODAL_TYPES.GROUP_BOOKING, {
            session: store.sessions[2],
            attendees: store.attendees,
          })}
          content={'Group booking Demo 2 - limited spots'}
        />

        <Button
          themePath='button.contained.secondary'
          styles={testStyles.content.button}
          onClick={useCreateModal(Values.MODAL_TYPES.GROUP_BOOKING, {
            session: store.sessions[7],
            attendees: store.attendees,
          })}
          content={'Group booking Demo 3 - 1 spot left'}
        />

        <Button
          themePath='button.contained.secondary'
          styles={testStyles.content.button}
          onClick={useCreateModal(Values.MODAL_TYPES.ERROR, {
            title: 'Session Fully Booked',
            message:
              'There is insufficient capacity for your selection. Please reduce the number of selected bookings',
          })}
          content={'Group booking Demo 4 - no spots left'}
        />
      </Section>
      { store.modals.length > 0 && RenderModals(store.modals) }
    </View>
  )
}
