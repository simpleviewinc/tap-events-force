import React, { useEffect, useState } from 'react'
import { Button, Section, H6, H5, Divider, View } from 'SVComponents'
import { useTheme } from '@keg-hub/re-theme'
import testData from '../mocks/eventsforce/testData.js'
import { mapSessionInterface } from 'SVActions'
import { RenderModals } from 'SVComponents/modals'
import { Values } from 'SVConstants'
import { useCreateModal } from 'SVHooks/modal'
import { useSelector } from 'react-redux'
import { withAppHeader } from 'SVComponents'
import { useKegEvent } from 'SVHooks/events'
import { isNative } from 'SVUtils/platform/isNative'
import { EvfButton } from 'SVComponents/button'
import { TestData } from 'SVComponents/testData'

const { EVENTS } = Values

const testOnSessionBookingRequest = (session, attendees) => {
  console.log(attendees)
  console.log(session)
}

const testOnSessionWaitingListRequest = (sessionId, attendeeIds) => {
  console.log(sessionId)
  console.log(attendeeIds)
}

/**
 * TestContainer to be used by QA to test out individual component
 */
export const TestContainer = withAppHeader('Test Container', props => {
  const [ mockData, setMockData ] = useState(testData)

  // map the evf props onto our states
  useEffect(() => void mapSessionInterface(mockData), [mockData])

  return (
    <View>
      { !isNative() && process.env.NODE_ENV === 'development' && (
        <TestData
          data={mockData}
          onSave={setMockData}
        />
      ) }
      <ModalDemos />
    </View>
  )
})

/**
 * EVF button demos
 * @param {object} styles
 */
const EVFButtonDemos = ({ styles }) => {
  const [ processing, setProcessing ] = useState(false)
  useEffect(() => {
    if (processing) {
      setTimeout(() => {
        setProcessing(false)
      }, 1000)
    }
  }, [processing])

  return (
    <Section>
      <H5>EVF Buttons</H5>
      <View style={styles.main}>
        <EvfButton
          type={'primary'}
          styles={styles.button}
          isProcessing
        />
        <EvfButton
          type={'primary'}
          styles={styles.button}
          onClick={() => console.log('clicked primary')}
          text={'Primary'}
        />
        <EvfButton
          type={'default'}
          styles={styles.button}
          onClick={() => console.log('clicked default')}
          text={'Default'}
        />
        <EvfButton
          type={'primary'}
          isProcessing={processing}
          styles={styles.button}
          onClick={() => setProcessing(true)}
          text={'Fetch'}
        />
      </View>
    </Section>
  )
}

export const ModalDemos = () => {
  const theme = useTheme()
  const testStyles = theme.get('testContainer')
  const store = useSelector(state => state.items)

  // set up our event listener for booking request
  useKegEvent(EVENTS.SESSION_BOOKING_REQUEST, testOnSessionBookingRequest)
  useKegEvent(
    EVENTS.SESSION_WAITING_LIST_REQUEST,
    testOnSessionWaitingListRequest
  )

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
          content={'Group booking Demo 3 - 1 spot left, no waiting list'}
        />

        <Button
          themePath='button.contained.secondary'
          styles={testStyles.content.button}
          onClick={useCreateModal(Values.MODAL_TYPES.GROUP_BOOKING, {
            session: store.sessions.find(x => x.identifier === '12'),
            attendees: store.attendees,
          })}
          content={'Group booking Demo 4 - greater capacity than need'}
        />

        <Button
          themePath='button.contained.secondary'
          styles={testStyles.content.button}
          onClick={useCreateModal(Values.MODAL_TYPES.ALERT, {
            title: 'Session Fully Booked',
            message:
              'There is insufficient capacity for your selection. Please reduce the number of selected bookings',
          })}
          content={'Group booking Demo 5 - no spots left'}
        />
      </Section>

      <EVFButtonDemos styles={testStyles.content.evfButtons} />
      { store.modals.length > 0 && RenderModals(store.modals) }
    </View>
  )
}
