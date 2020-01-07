const path = require('path');
const BomPlugin = require('../webpack-utf8-bom');

module.exports = {
  mode: 'development',

  entry: {
    test: path.resolve(__dirname, 'test.js')
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  plugins: [new BomPlugin(true)]
};
