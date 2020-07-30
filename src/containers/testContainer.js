import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Button } from 'SVComponents'
import { useTheme } from '@simpleviewinc/re-theme'
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
export const TestContainer = withAppHeader('TestContainer', props => {
  const store = useSelector(state => state.items)
  const theme = useTheme()
  // map the evf props onto our states
  useEffect(() => {
    // placeholder data for now
    mapSessionInterface(testData)
  }, [])
  return (
    <View
      data-class='sessions-main'
      style={theme.get('sessions.main')}
    >
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
      { store.modals.length > 0 && RenderModals(store.modals) }
    </View>
  )
})
