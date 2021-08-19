import React from 'react'
import { Text } from '@keg-hub/keg-components'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import PropTypes from 'prop-types'

const StyledLabel = reStyle('label')(() => ({ margin: 0, cursor: 'pointer' }))

/**
 * Label component
 * @param {*} props
 * @returns
 */
export const Label = props => {
  const { children, onPress, ...rest } = props
  return (
    <Text onPress={onPress}>
      <StyledLabel {...rest}> { children } </StyledLabel>
    </Text>
  )
}

Label.propTypes = {
  onPress: PropTypes.func,
}
