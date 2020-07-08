import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { View, Image, Text } from 'react-native'
import { H4, H5, Modal, TouchableIcon } from 'SVComponents'
import { removeModal } from 'SVActions'

const longText =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
/**
 * PresenterDetailModal
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 */
export const PresenterDetails = props => {
  const { presenter } = props
  if (!presenter) return null
  const theme = useTheme()
  console.log(theme.modal)
  console.log({ theme })
  const title = `${presenter.title} ${presenter.firstname} ${presenter.lastname}`
  return (
    <Modal
      styles={{ main: { padding: 0 } }}
      visible={true}
      onBackdropTouch={() => removeModal()}
    >
      <Header
        title={title}
        theme={theme}
      />
      <Content
        presenter={presenter}
        theme={theme}
      />

      { /* <Button
        themePath='button.contained.primary'
        onClick={() =>
          addModal(new ModalModel({ type: 'presenter', data: presenter }))
        }
        content={'Open Modal'}
      /> */ }
    </Modal>
  )
}

const Header = ({ title, theme }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.surface.primary.colors.main,
      }}
    >
      <H5 style={{ alignSelf: 'center', color: 'white', padding: 10 }}>
        { title }
      </H5>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          flex: 1,
          padding: 10,
        }}
      >
        <TouchableIcon
          styles={{ color: 'white', fontSize: 25 }}
          onPress={() => removeModal()}
          name={'close'}
          size={35}
        />
      </View>
    </View>
  )
}

/**
 * Content
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 */
const Content = ({ presenter, theme }) => {
  return (
    <View style={{ padding: 15 }}>
      { /* row 1 */ }
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={{
            width: 150,
            height: 150,
            overflow: 'hidden',
            borderRadius: 150 / 2,
          }}
          source={{
            uri: presenter.photographUrl,
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 20,
          }}
        >
          <H4>{ presenter.jobtitle }</H4>
          <Text>{ presenter.company }</Text>
        </View>
      </View>

      { /* row 2 */ }
      <View style={{ paddingTop: 15 }}>
        <Text style={{ flexWrap: 'wrap', flex: 1 }}> { longText }</Text>
      </View>
    </View>
  )
}
