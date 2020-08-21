import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Button, Section, H6, H5, Divider } from 'SVComponents'
import { useTheme } from '@sv-keg/re-theme'
import testData from '../mocks/eventsforce/testData'
import { mapSessionInterface } from 'SVActions'
import { RenderModals } from 'SVComponents/modal'
import { Values } from 'SVConstants'
import { useCreateModal } from 'SVHooks/modal'
import { useSelector } from 'react-redux'
import { withAppHeader } from 'SVComponents'

/**
 * TestContainer to be used by QA to test out individual component
 */
export const TestContainer = withAppHeader('Demos', props => {
  const store = useSelector(state => state.items)
  const theme = useTheme()
  console.log(store.modals)
  // map the evf props onto our states
  useEffect(() => {
    // placeholder data for now
    mapSessionInterface(testData)
  }, [])
  return (
    <View style={theme.get('sessions.main')}>
      <Button
        themePath='button.contained.primary'
        onClick={useCreateModal(
          Values.MODAL_TYPES.PRESENTER,
          store.presenters[0]
        )}
        content={'Open Presenter 1 (image + short bio)'}
      />
      <Button
        themePath='button.contained.primary'
        onClick={useCreateModal(
          Values.MODAL_TYPES.PRESENTER,
          store.presenters[1]
        )}
        content={'open presenter 2 (no image, no bio)'}
      />
      <Button
        themePath='button.contained.primary'
        onClick={useCreateModal(
          Values.MODAL_TYPES.PRESENTER,
          store.presenters[2]
        )}
        content={'open presenter 3 (long bio text)'}
      />
      <Section>
        <H5>Modals</H5>
        <Divider />

        <H6 style={{ paddingVertical: 10 }}>Group Bookings</H6>
        <Button
          themePath='button.contained.secondary'
          onClick={useCreateModal(Values.MODAL_TYPES.GROUP_BOOKING, {
            session: store.sessions[1],
            attendees: store.attendees,
          })}
          content={'Group booking Demo 1 - unlimited spots'}
        />

        <Button
          themePath='button.contained.secondary'
          onClick={useCreateModal(Values.MODAL_TYPES.GROUP_BOOKING, {
            session: store.sessions[2],
            attendees: store.attendees,
          })}
          content={'Group booking Demo 2 - limited spots'}
        />

        <Button
          themePath='button.contained.secondary'
          onClick={useCreateModal(Values.MODAL_TYPES.GROUP_BOOKING, {
            session: store.sessions[7],
            attendees: store.attendees,
          })}
          content={'Group booking Demo 3 - 1 spot left'}
        />

        <Button
          themePath='button.contained.secondary'
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
})
