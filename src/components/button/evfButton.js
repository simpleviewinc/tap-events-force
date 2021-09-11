import { checkCall, omitKeys } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'
import { EvfLoading } from 'SVComponents/loading/evfLoading'
import React, { useMemo, useContext, useCallback } from 'react'
import { renderFromType, View, Text } from '@keg-hub/keg-components'
import { ComponentsContext } from 'SVContexts/components/componentsContext'

/**
 * Processing
 * @param {object} props
 * @param {object} props.styles
 * @param {string=} props.text
 */
const Processing = props => {
  const { pendingStyles, styles, text = 'Processing' } = props

  const processStyles = useStyle(styles, pendingStyles)

  return (
    <View
      className={'ef-button-text-main'}
      style={styles.main}
    >
      <EvfLoading
        color={processStyles?.icon?.color}
        size={processStyles?.icon?.size}
      />
      <Text
        className={'ef-button-text'}
        style={[processStyles.content]}
      >
        { text }
      </Text>
    </View>
  )
}

/**
 * Render the children based on the passed in type
 * @param {Object} props
 * @param {Object|function|string} props.children - Child content to render
 * @param {Object} props.styles - Custom styles for the children components
 * @param {boolean} props.selectable - Should the text be selectable
 * @param {boolean} props.isProcessing - Is the button in a processing state
 *
 * @returns {Object} - Merged Evf button styles
 */
const RenderChildren = React.memo(props => {
  const {
    children,
    styles,
    pendingStyles,
    selectable = false,
    isProcessing = false,
  } = props

  const contentStyles = useStyle(`button.contained.default`, styles?.button)

  const content = isProcessing
    ? buttonProps => (
        <Processing
          {...buttonProps}
          pendingStyles={pendingStyles}
          styles={styles?.processing}
        />
      )
    : children

  const contentProps = useMemo(() => {
    const style = omitKeys(contentStyles?.default?.content, [
      'color',
      'transitionProperty',
      'transitionDuration',
      'transitionTimingFunction',
    ])

    return {
      style,
      selectable,
      className: `ef-button-text`,
    }
  }, [ content, contentStyles, selectable ])

  return renderFromType(content, contentProps, Text)
})

/**
 * EvfButton
 * @param {object} props
 * @param {object} props.styles
 * @param {object} props.onClick
 * @param {('default'|'primary')} props.type - button type. defaults to 'default'
 * @param {string} props.text - text to display on button
 * @param {boolean} props.isProcessing - to display processing content
 */
export const EvfButton = props => {
  const {
    buttonType,
    children,
    disabled,
    isProcessing,
    onClick,
    styles,
    style,
    className,
    text,
    ...childProps
  } = props

  const { ButtonComponent } = useContext(ComponentsContext)
  const btnStyles = useStyle(`button.evfButton`, styles)

  // Wrap the onClick, so we can catch the event
  // Then stop it from propagating to the parent elements
  const onBtnClick = useCallback(
    event => {
      event.stopPropagation()
      checkCall(onClick, event)
    },
    [onClick]
  )

  // EVF will only accept these props for their button component
  // The buttonType should be one of “selectSession” | "modalPrimary" | "modalSecondary"
  return (
    <ButtonComponent
      style={style}
      className={className}
      disabled={Boolean(disabled || isProcessing)}
      buttonType={buttonType}
      onClick={onBtnClick}
    >
      <RenderChildren
        {...childProps}
        styles={btnStyles}
        children={children || text}
        isProcessing={isProcessing}
      />
    </ButtonComponent>
  )
}
