const path = require('path')

module.exports = {
  entry: './src/selectors.js',
  output: {
    filename: 'selectors_bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
