import React, { useState } from 'react'
import { SessionsContainer } from './sessionsContainer'
import { ModalDemos } from './testContainer'
import { Button } from '@svkeg/keg-components'

const showButtonStyles = {
  main: {
    zIndex: -1,
    width: 170,
    margin: 15,
  },
}

/**
 * Container exported to demonstrate some features of the Sessions app, like modals
 * @param {Object} props - passed directly to the sessions container
 */
export const EFDemoContainer = props => {
  const [ showDemo, setShowDemo ] = useState(false)
  return (
    <React.Fragment>
      { !props.disableDemo && (
        <Button
          styles={showButtonStyles}
          onPress={() => setShowDemo(!showDemo)}
          content={'Toggle Modal Demo'}
        />
      ) }
      { showDemo ? <ModalDemos /> : <SessionsContainer {...props} /> }
    </React.Fragment>
  )
}
