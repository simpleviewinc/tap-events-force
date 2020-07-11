import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native'
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
      styles={{ content: presenterStyles.container }}
      visible={true}
      onBackdropTouch={removeModal}
    >
      <Header
        title={title}
        theme={presenterStyles}
      />
      <Content
        presenter={presenter}
        theme={presenterStyles}
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
const Header = ({ title, theme }) => {
  const headerStyles = theme.header || {}
  return (
    <View style={headerStyles.container}>
      <Text
        style={headerStyles.title}
        numberOfLines={1}
      >
        { title }
      </Text>
      <View style={headerStyles.closeButton}>
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

const contentStyles = StyleSheet.create({
  main: { paddingHorizontal: 30, flex: 1 },
  row1: { flexDirection: 'row' },
})

/**
 * Content
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 * @param {object} props.theme - presenter theme from global theme
 */
const Content = ({ presenter, theme }) => {
  return (
    <View style={contentStyles.main}>
      { /* row 1 - image and titles */ }
      <View style={contentStyles.row1}>
        <Image
          style={theme.content.header.image}
          source={{
            // TODO: replace the placeholder image with the real placeholder
            uri: presenter.photographUrl
              ? presenter.photographUrl
              : 'https://placegoat.com/300/300',
          }}
        />
        <View style={theme.content.header.container}>
          <Text
            style={theme.content.header.title}
            numberOfLines={1}
          >
            { presenter.jobtitle }
          </Text>
          <Text
            style={theme.content.header.company}
            numberOfLines={1}
          >
            { presenter.company }
          </Text>
        </View>
      </View>

      { /* row 2 - bio */ }
      { presenter.biography ? (
        <ScrollView
          style={theme.content.description.style}
          contentContainerStyle={
            theme.content.description.contentContainerStyle
          }
        >
          <Text> { presenter.biography }</Text>
        </ScrollView>
      ) : null }
    </View>
  )
}
