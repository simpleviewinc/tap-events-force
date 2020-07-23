import React, { useState } from 'react'
import { useTheme, useDimensions } from '@simpleviewinc/re-theme'
import { View, Image, Text, ScrollView } from 'react-native'
import { TouchableIcon, Modal } from 'SVComponents'
import { removeModal } from 'SVActions'

const modalMaxHeight = 772
const placeholderImage = require('SVAssets/profile_placeholder.png')
/**
 * PresenterDetailModal
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 */
export const PresenterDetails = props => {
  const { presenter, visible } = props
  if (!presenter) return null
  // two possible cases for a non visible modal
  // 1. modal is mounted/in store but has been animated out of view by another modal
  // 2. modal has been removed from the store
  const [ mount, setMount ] = useState(true)
  const theme = useTheme()
  const viewHeight = theme.RTMeta.height
  const maxHeight = viewHeight <= modalMaxHeight ? '90%' : modalMaxHeight

  const presenterStyles = theme.get('modal.presenter') || {}
  const title = `${presenter.title} ${presenter.firstname} ${presenter.lastname}`

  return (
    <Modal
      styles={{ content: { ...presenterStyles.modal.content, maxHeight } }}
      visible={visible && mount}
      onAnimateOut={mount ? removeModal : null}
      onBackdropTouch={() => setMount(false)}
    >
      <Header
        title={title}
        styles={presenterStyles.modal.header}
        setMount={setMount}
      />
      <Body
        presenter={presenter}
        styles={presenterStyles.modal.body}
      />
    </Modal>
  )
}

/**
 * Title bar for modal
 * @param {object} props
 * @param {string} props.title
 * @param {object} props.theme - presenter theme from global theme
 * @param {object} props.setMount - used to state the modals visible state for animation
 */
const Header = ({ title, styles, setMount }) => {
  return (
    <View style={styles.main}>
      <Text
        style={styles.title}
        numberOfLines={1}
      >
        { title }
      </Text>
      <View style={styles.closeButton}>
        <TouchableIcon
          onPress={() => setMount(false)}
          name={'close'}
          color={'white'}
          size={22}
        />
      </View>
    </View>
  )
}

/**
 * Body
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 * @param {object} props.theme - presenter theme from global theme
 */
const Body = ({ presenter, styles }) => {
  // need to update content height based on screen height
  const dim = useDimensions()
  const bioContentStyle =
    dim.height <= modalMaxHeight
      ? dim.height <= 450
          ? { maxHeight: 100 }
          : { maxHeight: 250 }
      : styles.row2.content

  // use small image style if height is small enough
  // otherwise use the dynamic styling from width
  const imageStyle =
    dim.height <= 450 ? styles.row1.smallImage : styles.row1.image

  return (
    <View style={styles.main}>
      { /* row 1 - image and titles */ }
      <View style={styles.row1.container}>
        <Image
          style={imageStyle}
          source={{
            uri: presenter.photographUrl
              ? presenter.photographUrl
              : placeholderImage,
          }}
        />
        <View style={styles.row1.details}>
          <Text
            style={styles.row1.title}
            numberOfLines={1}
          >
            { presenter.jobtitle }
          </Text>
          <Text
            style={styles.row1.company}
            numberOfLines={1}
          >
            { presenter.company }
          </Text>
        </View>
      </View>

      { /* row 2 - bio */ }
      { presenter.biography ? (
        <ScrollView
          style={styles.row2.container}
          contentContainerStyle={bioContentStyle}
        >
          <Text style={styles.row2.biography}> { presenter.biography }</Text>
        </ScrollView>
      ) : null }
    </View>
  )
}
