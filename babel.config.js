module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  plugins: [
    // for async
    '@babel/plugin-transform-runtime',
    'babel-plugin-module-resolver',
    "@babel/plugin-proposal-class-properties"
  ]
}