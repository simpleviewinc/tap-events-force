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
          onClick={useCreateModal(
            Values.MODAL_TYPES.GROUP_BOOKING,
            store.presenters[2]
          )}
          content={'Group booking Demo 1'}
        />
      </Section>
      { store.modals.length > 0 && RenderModals(store.modals) }
    </View>
  )
})
