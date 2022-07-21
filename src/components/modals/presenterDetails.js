import React from 'react'
import { Image, View, Text, ScrollView } from '@old-keg-hub/keg-components'
import { useTheme, useDimensions } from '@keg-hub/re-theme'
import { BaseModal, contentDefaultMaxHeight } from './baseModal'
import { getPresenterFullName } from 'SVUtils/models'

const placeholderImage = `https://raw.githubusercontent.com/simpleviewinc/tap-events-force/master/src/assets/profile_placeholder.png`

/**
 * PresenterDetailModal
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 * @param {boolean} props.visible
 */
export const PresenterDetails = props => {
  const { presenter, visible } = props
  if (!presenter) return null

  const theme = useTheme()

  const presenterStyles = theme.get('modal.presenter') || {}

  return (
    <BaseModal
      className={`ef-modal-presenter`}
      title={getPresenterFullName(presenter)}
      visible={visible}
      Body={
        <Body
          presenter={presenter}
          styles={presenterStyles.content.body}
        />
      }
    />
  )
}

const contentMaxHeights = {
  h50: { maxHeight: 50 },
  h100: { maxHeight: 100 },
  h200: { maxHeight: 200 },
}
/**
 * Body
 * @param {object} props
 * @param {import('SVModels/presenter').Presenter} props.presenter
 * @param {object} props.styles - presenter styles from global theme
 */
const Body = ({ presenter, styles }) => {
  // need to update content height based on screen height
  const dim = useDimensions()
  const bioContentStyle =
    dim.height <= contentDefaultMaxHeight
      ? dim.height <= 600
          ? dim.height <= 350
              ? contentMaxHeights.h50
              : contentMaxHeights.h100
          : contentMaxHeights.h200
      : styles.row2.content.main

  // use small image style if height is small enough
  // otherwise use the dynamic styling from width
  const imageStyle =
    dim.height <= 450 ? styles.row1.smallImage : styles.row1.image

  return (
    <View
      className={`ef-modal-presenter-body`}
      style={styles.main}
    >
      { /* row 1 - image and titles */ }
      <View style={styles.row1.container}>
        <Image
          className={`ef-presenter-picture`}
          styles={{ image: imageStyle }}
          source={presenter.photographUrl || placeholderImage}
          accessibilityLabel={getPresenterFullName(presenter)}
        />
        <View
          className={`ef-modal-presenter-container`}
          style={styles.row1.details}
        >
          <Text
            className={'ef-modal-header'}
            style={styles.row1.title}
            numberOfLines={1}
          >
            { presenter.jobtitle }
          </Text>
          <Text
            className={'ef-modal-sub-header'}
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
          style={styles.row2.main}
          contentContainerStyle={bioContentStyle}
        >
          <Text
            className={'ef-modal-body'}
            style={styles.row2.content.biography}
          >
            { presenter.biography }
          </Text>
        </ScrollView>
      ) : null }
    </View>
  )
}
