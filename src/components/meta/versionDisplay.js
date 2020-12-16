import React from 'react'
import { Button } from '@keg-hub/keg-components'
import { colors } from 'SVTheme/colors'
import tapPackage from '../../../package.json'
import { getWindow } from 'SVUtils/platform/getWindow'

const openHomepage = () => getWindow()?.open(tapPackage.homepage + '/releases')

/**
 * Simple button that displays the current tap version and, if clicked,
 * links the user to the release notes on github
 * @param {Object} props
 * @param {String} props.version - version to display (defaults to using the package.json version)
 */
export const VersionDisplay = ({ version = tapPackage.version }) => {
  return (
    <Button
      onPress={openHomepage}
      styles={styles}
      content={'v' + version}
    />
  )
}

const styles = {
  main: {
    position: 'fixed',
    zIndex: -1,
    padding: 8,
    borderRadius: 8,
    bottom: 0,
    right: 0,
    margin: 10,
    backgroundColor: colors.second || 'gray',
    boxShadow: '0px 0px 6px',
  },
  content: {
    color: 'white',
    fontWeight: 'bold',
  },
}
