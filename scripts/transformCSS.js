const transform = require('css-to-react-native-transform').default
const fs = require('fs')

/**
 * Transforms the css string and returns a stringified javascript statement that
 * exports the style object
 * @param {String} cssString - css string
 * @param {String} name - export name
 */
const buildThemeFile = (cssString, name) => {
  const styles = JSON.stringify(
    transform(cssString)
  )
  return `/** ======== THIS IS A GENERATED FILE! ======== */\nexport const ${name} = ${styles}`
}


/**
 * Transforms css string into a react-native compatible style, written out as a theme file
 * @param {String} src - source path for css file
 * @param {String} destination - output path of theme file
 * @param {String} name - name of the theme's export
 */
const transformCSS = (src, dest, name) => {
  return fs.readFile(src, 'utf8', (err, data) => {
    if (err) throw err
    const theme = buildThemeFile(data, name)
    fs.writeFile(dest, theme, (err) => {
      if (err) throw err
      console.log('Transform and write complete.')
    })
  })
}

/**
 * Command line docs
 * @example node transformCSS.js ./test.css ./theme/evf.js
 * @param {String} arg1: src - source path of css file to transform
 * @param {String} arg2: dest - output path
 */
const [ src, dest, exportName='EVFStyles' ] = process.argv.slice(2)

transformCSS(src, dest, exportName)