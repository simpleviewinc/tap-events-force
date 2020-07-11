import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { View, Image, Text, ScrollView } from 'react-native'
import { Modal, TouchableIcon } from 'SVComponents'
import { removeModal } from 'SVActions'

/**
 * PresenterDetailModal
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 */
export const PresenterDetails = props => {
  const { presenter } = props
  if (!presenter) return null
  const theme = useTheme()
  const presenterStyles = theme.get('modal.presenter') || {}
  const title = `${presenter.title} ${presenter.firstname} ${presenter.lastname}`

  return (
    <Modal
      styles={{ content: presenterStyles.modal }}
      visible={true}
      onBackdropTouch={removeModal}
    >
      <Header
        title={title}
        styles={presenterStyles.header}
      />
      <Content
        presenter={presenter}
        styles={presenterStyles.content}
      />
    </Modal>
  )
}

/**
 * Title bar for modal
 * @param {object} props
 * @param {string} props.title
 * @param {object} props.theme - presenter theme from global theme
 */
const Header = ({ title, styles }) => {
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
          onPress={removeModal}
          name={'close'}
          color={'white'}
          size={22}
        />
      </View>
    </View>
  )
}

/**
 * Content
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 * @param {object} props.theme - presenter theme from global theme
 */
const Content = ({ presenter, styles }) => {
  return (
    <View style={styles.main}>
      { /* row 1 - image and titles */ }
      <View style={styles.row1.container}>
        <Image
          style={styles.row1.image}
          source={{
            // TODO: replace the placeholder image with the real placeholder
            uri: presenter.photographUrl
              ? presenter.photographUrl
              : 'https://placegoat.com/300/300',
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
          contentContainerStyle={styles.row2.content}
        >
          <Text style={styles.row2.biography}> { presenter.biography }</Text>
        </ScrollView>
      ) : null }
    </View>
  )
}
