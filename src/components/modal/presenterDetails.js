import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { View, Image, Text, ScrollView } from 'react-native'
import { H5, Modal, TouchableIcon } from 'SVComponents'
import { removeModal } from 'SVActions'

// const shortText =
//   'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'

const longText =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
/**
 * PresenterDetailModal
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 */
export const PresenterDetails = props => {
  const { presenter } = props
  if (!presenter) return null
  const theme = useTheme()
  console.log({ theme })
  const title = `${presenter.title} ${presenter.firstname} ${presenter.lastname}`

  return (
    <Modal
      styles={{ content: theme.modal.presenter.container }}
      visible={true}
      onBackdropTouch={() => removeModal()}
    >
      <Header
        title={title}
        theme={theme.modal.presenter}
      />
      <Content
        presenter={presenter}
        theme={theme.modal.presenter}
      />
    </Modal>
  )
}

/**
 * Title bar for modal
 * @param {object} params
 * @param {string} title
 * @param {object} props.theme - presenter theme from global theme
 */
const Header = ({ title, theme }) => {
  return (
    <View style={theme.header.container}>
      <H5
        style={theme.header.title}
        numberOfLines={1}
      >
        { title }
      </H5>
      <View style={theme.header.closeButton}>
        <TouchableIcon
          onPress={() => removeModal()}
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
const Content = ({ presenter, theme }) => {
  return (
    <View style={{ paddingHorizontal: 30, flex: 1 }}>
      { /* row 1 - image and titles */ }
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            // TODO: placeholder values until we get more detail
            width: 150,
            height: 150,
            overflow: 'hidden',
            borderRadius: 150 / 2,
          }}
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

      { /* row 2 - description */ }
      <ScrollView
        style={theme.content.description.style}
        contentContainerStyle={theme.content.description.contentContainerStyle}
      >
        <Text> { longText }</Text>
      </ScrollView>
    </View>
  )
}
